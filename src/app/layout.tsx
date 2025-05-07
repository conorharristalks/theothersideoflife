import type { Metadata } from "next";
import { Fraunces, Nunito_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

// Configure fonts with display=swap for better performance
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Conor Harris | The Other Side of Life",
  description: "Breathwork coaching and addiction recovery talks by Conor Harris",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning={true} 
      className="scroll-smooth"
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${fraunces.variable} ${nunitoSans.variable} ${libreBaskerville.variable}`}
      >
        <Navbar />
        <main className="overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
