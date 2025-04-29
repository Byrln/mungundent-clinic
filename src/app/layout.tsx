"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  
  // Initialize smooth scrolling for the entire site
  useSmoothScroll(80);

  return (
    <html lang="mn">
      <body className={inter.className}>
        <Providers>
            {!isAdminRoute && <Navbar />}
            <main>{children}</main>
            {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}