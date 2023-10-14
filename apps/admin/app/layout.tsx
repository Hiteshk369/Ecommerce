import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce | Dashboard",
  description: "Admin dashboard for ecommerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
