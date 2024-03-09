import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import TailwindIndicator from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={cn("bg-background font-sans antialiased", inter.className)}
      >
        <Providers>
          <div className="flex flex-col">
            <Header />
            <div className="min-h-[80vh] flex-1">{children}</div>
            <Footer />
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
