import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./component/Navbar";

export const metadata: Metadata = {
  title: "StayFinder",
  description: "Find and book your next stay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
          © 2025 StayFinder. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
