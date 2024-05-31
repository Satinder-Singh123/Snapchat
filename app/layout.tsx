import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snapchat",
  description: "snapchat build using Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
        {children}
        </SocketProvider>
        </body>
    </html>
  );
}
