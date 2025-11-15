import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanye 2049 - Global Pop Portfolio",
  description: "An interactive portfolio exploring global pop culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
