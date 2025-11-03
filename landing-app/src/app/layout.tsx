import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Noto_Sans_Georgian } from "next/font/google";

const firaGo = localFont({
  src: "../../public/fonts/Firago/FiraGO_OTF_1001/Roman/FiraGO-ExtraBold.otf",
  weight: "800",
  variable: "--font-firago",
  display: "swap",
});

const notoSansGeorgian = Noto_Sans_Georgian({
  weight: ["200", "400", "700"],
  subsets: ["georgian", "latin"],
  variable: "--font-noto-sans-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agrohub",
  description: "join agrohub family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaGo.variable} ${notoSansGeorgian.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
