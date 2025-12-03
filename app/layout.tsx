import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanye Global Pop - Interactive Portfolio",
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
