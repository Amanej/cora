import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { FacebookPixel } from "@/lib/tracking/pixels/facebook";
import { GoogleTagBody, GoogleTagHead } from "@/lib/tracking/pixels/google";
import { LinkedInPixel } from "@/lib/tracking/pixels/linkedin";
import { AuthProvider } from '@/domains/auth/state/AuthContext';
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoraFone - Ai Call Center",
  description: "Automate your phone calls with AI. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FacebookPixel />
        <GoogleTagHead />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GoogleTagBody />
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Toaster />
            <Footer />
          </div>
          <LinkedInPixel />
        </AuthProvider>
      </body>
    </html>
  );
}
