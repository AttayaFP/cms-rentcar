"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, X, Phone } from "lucide-react"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Armada Mobil", href: "#armada" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Informasi Wisata", href: "#wisata" },
    { label: "Syarat Sewa", href: "#syarat" },
  ]

  const isDark = mounted ? resolvedTheme === "dark" : false

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#070A10]/95 dark:shadow-none py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-44 sm:h-12 sm:w-52">
            <Image
              src={isScrolled && !isDark ? "/brand/logo-dark.svg" : "/brand/logo-light.svg"}
              alt="Nabil Rental Padang"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isScrolled && !isDark
                  ? "text-slate-700 hover:text-[#B45309]"
                  : "text-slate-100 hover:text-[#FDE68A] drop-shadow-sm"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <a
            href="https://wa.me/6282279690769?text=Halo%20Nabil%20Rental%20Padang%2C%20saya%20ingin%20tanya%20ketersediaan%20sewa%20mobil."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#25D366]/25 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/images/main/whatsapp.png"
              alt="WhatsApp"
              width={18}
              height={18}
              className="size-4.5 shrink-0 object-contain drop-shadow-sm"
            />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Buka Menu"
            className={`flex size-11 items-center justify-center rounded-xl border transition-colors ${
              isScrolled && !isDark
                ? "border-slate-200 bg-slate-100 text-slate-900"
                : "border-white/20 bg-black/40 text-white backdrop-blur-md"
            }`}
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white/95 px-6 py-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#070A10]/98 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-base font-bold text-slate-800 transition-colors hover:text-[#D4AF37] dark:text-white"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
              <a
                href="https://wa.me/6282279690769?text=Halo%20Nabil%20Rental%20Padang%2C%20saya%20ingin%20sewa%20mobil."
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-md shadow-[#25D366]/25"
              >
                <Image
                  src="/images/main/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="size-5 shrink-0 object-contain drop-shadow-sm"
                />
                <span>Hubungi via WhatsApp</span>
              </a>

              <a
                href="tel:082279690769"
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 text-sm font-bold text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-white"
              >
                <Phone className="size-4 text-[#D4AF37]" />
                <span>0822-7969-0769</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
