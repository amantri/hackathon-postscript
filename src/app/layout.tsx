import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DevBar } from "@/components/DevBar";
import { Suspense } from "react";
import { ChatProvider } from "@/components/ChatContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Health - MyChart",
  description: "Interactive After Visit Summary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-gray-100 antialiased font-sans`}
    >
      <body className="min-h-screen flex flex-col text-gray-900">
        <ChatProvider>
          {children}
        </ChatProvider>
        <Suspense fallback={null}>
          <DevBar />
        </Suspense>
      </body>
    </html>
  );
}
