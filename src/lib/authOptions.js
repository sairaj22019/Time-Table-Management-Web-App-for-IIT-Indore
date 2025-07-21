

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
          if (!user) throw new Error("No user found");

          if (user.googleProvider) {
            throw new Error("This account is linked with Google. Please login with Google.");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Invalid password");

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

    async jwt({ token, user, trigger, session }) {
      // On first login
      if (user) {
        token.id = user.id;
        const userdata = await User.findById(user.id);
        if (userdata) {
          token.role = userdata.role || null;
          token.username = userdata.username || "";
          token.googleProvider = userdata.googleProvider || false;
        } else {
          console.error("user not found");
        }
      }

      // On client update() call (after complete-profile)
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        if (session.username) token.username = session.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role || null;
        session.user.username = token.username || "";
        session.user.googleProvider = token.googleProvider || false;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

