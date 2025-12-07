import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Appbar from "@/Components/Appbar";
import Sidebar from "@/Components/Sidebar";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "hey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <div style={{ width: "250px" }}>
            <Sidebar />
          </div>

          {/* Right side: header + content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flexShrink: 0 }}>
            {/* Header */}
            <Appbar />
          </div>
            <div
              style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
