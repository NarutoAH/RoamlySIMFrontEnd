import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ESIMConnections - International eSIM for Pakistan, Middle East & Europe",
  description:
    "Get international eSIM data plans for Pakistan, Saudi Arabia, UAE, Germany, and Spain. No physical SIM needed. Affordable plans starting from PKR 259.",
  keywords: ["eSIM", "Pakistan", "Saudi Arabia", "UAE", "Germany", "Spain", "international eSIM", "non-PTA", "ESIMConnections"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-[#FAFAF7] text-slate-900 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300`}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
