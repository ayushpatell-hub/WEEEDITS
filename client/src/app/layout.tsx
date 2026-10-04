import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "WEEEDITS | Video Editing & Paid Promotion Agency",
  description:
    "WEEEDITS is a video editing and paid promotion agency for creators and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}