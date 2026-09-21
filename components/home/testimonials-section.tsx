"use client"

import { motion } from "motion/react"
import { Star, MessageSquareQuote, CheckCircle, ArrowRight } from "lucide-react"

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Dr. Hendra Kurniawan",
      role: "Kunjungan Kedinasan Instansi",
      city: "Jakarta Pusat",
      car: "Toyota Innova Zenix (+Driver)",
      rating: 5,
      comment: "Sangat puas dengan pelayanan Nabil Rental Mobil Padang. Driver sangat sopan, paham jalur pintas, dan mobil harum bersih seperti baru keluar dealer. Sangat direkomendasikan untuk tamu kedinasan.",
    },
    {
      name: "Siti Rahmadani & Keluarga",
      role: "Wisata Tour Keluarga",
      city: "Surabaya",
      car: "Toyota HiAce Premio Luxury",
      rating: 5,
      comment: "Rombongan keluarga kami 10 orang liburan ke Mandeh dan Bukittinggi. HiAce Premio nya luar biasa nyaman, legroom lega, suspensi empuk, dan AC dingin merata. Anak-anak dan orang tua sangat menikmati perjalanan.",
    },
    {
      name: "Dimas Prasetyo",
      role: "Perjalanan Bisnis & Kuliner",
      city: "Bandung",
      car: "Toyota Avanza Veloz (Lepas Kunci)",
      rating: 5,
      comment: "Serah terima langsung di Bandara BIM jam 11 malam dilayani tepat waktu tanpa repot. Verifikasi E-KTP dan tiket via WhatsApp hanya 10 menit. Kondisi ban tebal dan rem sangat pakem di tanjakan.",
    },
  ]

  return (
    <section id="testimoni" className="relative scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24 transition-colors dark:bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
            <MessageSquareQuote className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
              Ulasan Nyata Pelanggan
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Pengalaman Sewa Terbaik di Sumatera Barat
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Kepercayaan ratusan instansi pemerintah, keluarga wisatawan, dan pebisnis yang mempercayakan mobilitas transportasi mereka kepada Nabil Rental Mobil Padang.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E] dark:text-[#FDE68A]">
            <span>Geser ulasan</span>
            <ArrowRight className="size-3.5 animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {reviews.length} Ulasan
          </span>
        </div>

        <div className="mt-4 sm:mt-12 -mx-4 flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="w-[85vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none"
            >
              <article className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/80 bg-[#FBFBF9] p-6 shadow-sm transition-all duration-300 hover:border-[#C5A059]/60 hover:shadow-xl dark:border-white/10 dark:bg-[#0B0F17] sm:p-8">
                <div>
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-[#C5A059]" />
                    ))}
                  </div>

                  <p className="mt-4 text-xs font-medium leading-relaxed text-slate-700 dark:text-[#CBD5E1] sm:text-sm">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-200/80 pt-4 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rev.name}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8]">
                        {rev.role} • {rev.city}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                      <CheckCircle className="size-3" />
                      Terverifikasi
                    </span>
                  </div>

                  <div className="mt-2.5 inline-block rounded-lg bg-stone-200/60 px-2.5 py-1 text-[10px] font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                    Unit: {rev.car}
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
