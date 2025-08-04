

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/authOptions";

import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import SessionWrapper from "./SessionWrapper";
import { YearProvider } from "@/components/YearProvider";
import Head from 'next/head';
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Campus Sync",
  description: "Smart Scheduling Made Simple",
};

export default async function RootLayout({ children }) {
  await connectDB();
  const session = await auth();

  let year = null;
  if (session?.user?.id) {
    const student = await Student.findOne({ userId: session.user.id });
    year = student?.year || null;
  }
  console.log("2nd", year);

  return (
    <html lang="en">
      <Head>
        <Link rel="icon" href="/iconn.png" type="image/png" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionWrapper>
          <YearProvider year={year}>
            {children}
          </YearProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
