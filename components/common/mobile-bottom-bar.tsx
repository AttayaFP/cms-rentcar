"use client"

import Image from "next/image"
import { Phone } from "lucide-react"

export function MobileBottomBar() {
  const whatsappUrl = "https://wa.me/6282287140724?text=Halo%20Nabil%20Rental%20Padang%2C%20saya%20ingin%20sewa%20mobil."

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/90 bg-white/95 px-3.5 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#070A10]/95 dark:shadow-[0_-8px_24px_rgba(0,0,0,0.5)] md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <a
          href="tel:082287140724"
          aria-label="Telepon Nabil Rental Padang"
          className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-stone-100 text-slate-900 transition-colors active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-white"
        >
          <Phone className="size-5 text-[#C5A059]" />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pesan Mobil via WhatsApp"
          className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#25D366]/25 transition-all active:scale-98"
        >
          <Image
            src="/images/main/whatsapp.png"
            alt="WhatsApp"
            width={22}
            height={22}
            className="size-5 shrink-0 object-contain drop-shadow-sm"
          />
          <span>Sewa via WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
