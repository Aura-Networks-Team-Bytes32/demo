import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "E-Commerce",
  description:
    "E-Commerce built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
