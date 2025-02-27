import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create your Resume - Resume Builder",
  description: "This website helps you create your resume in minutes.",
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]`}>
        <Navbar />
        <div className="min-h-{89vh}">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
