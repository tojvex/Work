import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GGC4RKK');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${firaGo.variable} ${notoSansGeorgian.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5GGC4RKK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
