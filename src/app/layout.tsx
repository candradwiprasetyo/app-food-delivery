import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Satisfy } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  variable: "--font-satisfy",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "App Food Delivery",
  description:
    "App Food Delivery is platform for discovering and ordering your favorite meals",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${satisfy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
