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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.nabilrentalmobilpadang.biz.id"),
  title: {
    default: "Rental Mobil Padang Nomor 1: Sewa Mobil Lepas Kunci & Driver",
    template: "%s | Nabil Rental Mobil Padang",
  },
  description:
    "Rental mobil Padang nomor 1 dan jasa sewa mobil Padang terpercaya. Tersedia sewa mobil lepas kunci dan dengan supir profesional untuk rute Padang, Bukittinggi, Mandeh, Harau. Serah terima 24 jam di Bandara BIM, armada terawat prima siap tanjakan Sitinjau Lauik.",
  keywords: [
    "rental mobil padang",
    "rental padang",
    "mobil padang",
    "rental mobil",
    "sewa mobil padang",
    "rental mobil lepas kunci padang",
    "sewa mobil dengan supir padang",
    "rental mobil bandara bim padang",
    "sewa mobil murah padang",
    "rental mobil nomor 1 padang",
    "sewa innova reborn padang",
    "rental hiace padang",
    "paket wisata sumatera barat",
    "Nabil Rental Mobil Padang",
  ],
  authors: [{ name: "Nabil Rental Mobil Padang" }],
  creator: "Nabil Rental Mobil Padang",
  publisher: "Nabil Rental Mobil Padang",
  alternates: {
    canonical: "https://www.nabilrentalmobilpadang.biz.id",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rental Mobil Padang Nomor 1: Sewa Mobil Lepas Kunci & Driver",
    description:
      "Rental mobil Padang nomor 1 dan sewa mobil Padang terpercaya. Unit bersih terawat, siap tanjakan ekstrem Sitinjau Lauik dan Kelok 44. Antar jemput Bandara BIM 24 jam.",
    url: "https://www.nabilrentalmobilpadang.biz.id",
    siteName: "Nabil Rental Mobil Padang",
    images: [
      {
        url: "/images/main/og-share.svg",
        width: 1200,
        height: 630,
        alt: "Nabil Rental Mobil Padang: Sewa Mobil Lepas Kunci & Antar Jemput Bandara BIM",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Mobil Padang Nomor 1: Sewa Mobil Lepas Kunci & Driver",
    description:
      "Rental mobil Padang nomor 1 terpercaya. Antar jemput Bandara BIM 24 jam, armada siap tanjakan Sitinjau Lauik dan rute Bukittinggi.",
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
  "@id": "https://www.nabilrentalmobilpadang.biz.id/#autorental",
  name: "Nabil Rental Mobil Padang",
  alternateName: ["Nabil Rent Car Padang", "Rental Mobil Padang Nabil"],
  image: "https://www.nabilrentalmobilpadang.biz.id/images/main/og-share.svg",
  telephone: "+6281276295523",
  url: "https://www.nabilrentalmobilpadang.biz.id",
  priceRange: "Rp 300.000 - Rp 1.500.000",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Transfer Bank",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Komplek Perumdam III/4, Tunggul Hitam",
    addressLocality: "Padang",
    addressRegion: "Sumatera Barat",
    postalCode: "25173",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -0.8830518,
    longitude: 100.3591148,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Padang",
    },
    {
      "@type": "City",
      name: "Bukittinggi",
    },
    {
      "@type": "AdministrativeArea",
      name: "Sumatera Barat",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Rental Mobil Padang",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rental Mobil Lepas Kunci Padang",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sewa Mobil Dengan Supir Padang",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Antar Jemput Bandara BIM Padang",
        },
      },
    ],
  },
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
