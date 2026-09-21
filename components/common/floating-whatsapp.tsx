"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/6282287140724?text=Halo%20Nabil%20Rental%20Padang%2C%20saya%20ingin%20konsultasi%20sewa%20mobil."

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-5 z-40 hidden md:block">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi WhatsApp Nabil Rental Padang"
        className="group relative flex items-center gap-3 rounded-full border border-emerald-500/40 bg-white/95 p-2 pr-5 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 dark:border-[#25D366]/40 dark:bg-[#070A10]/95"
      >
        <div className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-emerald-500/15">
          <div className="size-8">
            <DotLottieReact
              src="/lottie/Whatsapp icon animation.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        <div className="hidden flex-col sm:flex">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-[#25D366]">
            Online 24 Jam
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Chat WhatsApp
          </span>
        </div>
      </a>
    </aside>
  )
}
