import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       // your credentials config here
//     }),
//   ],
//   pages: {
//     signIn: '/login', // this connects your custom login page
//   },
//   // Add callbacks if needed
// }

// export default NextAuth(authOptions)

