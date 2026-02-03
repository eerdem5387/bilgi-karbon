import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bilgi.karbonkurs.com'),
  title: "Bilgi ve İletişim Formu - Karbon Kurs Plus",
  description: "Bilgi almak ve iletişime geçmek için form - Karbon Kurs Plus (Rize & Trabzon)",
  openGraph: {
    title: "Bilgi ve İletişim Formu - Karbon Kurs Plus",
    description: "Bilgi almak ve iletişime geçmek için form - Karbon Kurs Plus",
    url: 'https://bilgi.karbonkurs.com',
    siteName: 'Karbon Kurs Plus Bilgi Formu',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Karbon Kurs Plus Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Bilgi ve İletişim Formu - Karbon Kurs Plus",
    description: "Bilgi almak ve iletişime geçmek için form - Karbon Kurs Plus",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${montserrat.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
