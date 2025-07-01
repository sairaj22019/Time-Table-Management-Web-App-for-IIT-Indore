import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),


    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          hd: "iiti.ac.in", 
          prompt: "select_account",
        }
      }
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {

        if (!user.email?.endsWith("@iiti.ac.in")) {
          return "/login?error=invalid_domain";
        }

        try {
          await connectDB();
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            dbUser = await User.create({
              email: user.email,
              googleProvider: true,
              role: "student", 
              isVerified: true, 
            });
          }
          user.id = dbUser._id.toString();
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const userdata = await User.findById(user.id)
        if(!userdata){
          console.error("user not found")
        }
        token.role = userdata.role

      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role

      }
      console.log("session" , session.user)
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30*24*60*60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
