import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nabilrentcarpadang.com"),
  title: {
    default: "Nabil Rental Padang: Sewa Mobil Lepas Kunci & Antar Jemput Bandara BIM",
    template: "%s | Nabil Rental Padang",
  },
  description:
    "Jasa rental mobil Padang terpercaya. Melayani sewa mobil lepas kunci dan dengan supir untuk rute Padang, Bukittinggi, Mandeh, Harau. Unit terawat siap tanjakan, serah terima 24 jam di Bandara BIM.",
  keywords: [
    "rental mobil padang",
    "sewa mobil padang",
    "rental mobil lepas kunci padang",
    "sewa mobil dengan supir padang",
    "rental mobil bandara bim padang",
    "sewa innova reborn padang",
    "rental hiace padang",
    "paket wisata sumatera barat",
    "nabil rental padang",
  ],
  authors: [{ name: "Nabil Rental Padang" }],
  creator: "Nabil Rental Padang",
  publisher: "Nabil Rental Padang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Nabil Rental Padang: Sewa Mobil Lepas Kunci & Bandara BIM",
    description:
      "Rental mobil nomor 1 di Padang, Sumatera Barat. Unit bersih terawat, siap tanjakan ekstrem Sitinjau Lauik dan Kelok 44. Antar jemput Bandara BIM 24 jam.",
    url: "https://nabilrentcarpadang.com",
    siteName: "Nabil Rental Padang",
    images: [
      {
        url: "/images/main/og-share.svg",
        width: 1200,
        height: 630,
        alt: "Nabil Rental Padang: Sewa Mobil Lepas Kunci & Antar Jemput Bandara BIM",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Rental Padang: Sewa Mobil Lepas Kunci & Bandara BIM",
    description:
      "Rental mobil Padang terpercaya. Antar jemput Bandara BIM 24 jam, armada siap tanjakan Sitinjau Lauik dan rute Bukittinggi.",
    images: ["/images/main/og-share.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "name": "Nabil Rental Padang",
  "image": "https://nabilrentcarpadang.com/images/main/og-share.svg",
  "telephone": "+6282287140724",
  "url": "https://nabilrentcarpadang.com",
  "priceRange": "Rp 300.000 - Rp 1.500.000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kota Padang",
    "addressLocality": "Padang",
    "addressRegion": "Sumatera Barat",
    "postalCode": "25000",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -0.9471,
    "longitude": 100.4172
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    "Kota Padang",
    "Bandara Internasional Minangkabau (BIM)",
    "Kota Bukittinggi",
    "Kawasan Wisata Mandeh",
    "Lembah Harau Payakumbuh",
    "Kabupaten Pesisir Selatan",
    "Kabupaten Padang Pariaman",
    "Sumatera Barat"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FBFBF9] font-sans text-slate-900 antialiased selection:bg-[#D4AF37] selection:text-[#0F172A] dark:bg-[#070A10] dark:text-[#F8FAFC]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
