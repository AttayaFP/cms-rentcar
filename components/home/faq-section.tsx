"use client"

import { useState } from "react"
import Image from "next/image"
import { HelpCircle, ChevronDown } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Apakah melayani serah terima mobil di Bandara BIM Padang selama 24 jam?",
      answer: "Ya, Nabil Rental Mobil Padang melayani antar jemput dan serah terima unit langsung di Bandara Internasional Minangkabau (BIM) selama 24 jam penuh. Tim kami akan menunggu kedatangan penerbangan Anda tepat waktu di area penjemputan terminal kedatangan.",
    },
    {
      question: "Berapa tarif sewa mobil lepas kunci dan bagaimana perhitungannya?",
      answer: "Tarif sewa mobil lepas kunci dimulai dari Rp 300.000 per 24 jam untuk City Car (Honda Brio) hingga Rp 450.000 per 24 jam untuk Toyota Innova Reborn. Hitungan sewa berlaku per 24 jam penuh sejak jam serah terima kendaraan.",
    },
    {
      question: "Apakah mobil boleh dibawa ke luar kota seperti Bukittinggi, Kelok 9, atau Pesisir Mandeh?",
      answer: "Tentu saja boleh. Seluruh armada mobil kami berada dalam kondisi mesin prima, suspensi nyaman, dan terawat khusus untuk menjelajahi berbagai rute Sumatera Barat, termasuk tanjakan Sitinjau Lauik, Bukittinggi, Kelok 9, hingga wisata bahari Mandeh.",
    },
    {
      question: "Apa saja persyaratan sewa mobil lepas kunci bagi wisatawan luar kota?",
      answer: "Bagi wisatawan atau tamu luar kota, persyaratannya sangat simpel: cukup menunjukkan foto E-KTP asli, foto SIM A aktif pengemudi, bukti tiket pesawat pulang-pergi (PP), serta konfirmasi voucher reservasi hotel di Sumatera Barat.",
    },
    {
      question: "Apakah tersedia paket sewa mobil mingguan atau bulanan untuk instansi perusahaan?",
      answer: "Ya, kami menyediakan kontrak sewa mobil jangka panjang mingguan dan bulanan untuk instansi BUMN, kementerian, perusahaan swasta, dan perorangan dengan penawaran harga khusus serta fasilitas invoice resmi dan unit pengganti jika dibutuhkan servis berkala.",
    },
    {
      question: "Bagaimana sistem pembayaran dan uang muka (DP) pemesanan?",
      answer: "Pemesanan unit dapat diamankan dengan uang muka (DP) ringan melalui transfer bank resmi. Pelunasan sisa biaya sewa dapat dilakukan saat unit kendaraan telah diserahterimakan kepada Anda di lokasi penjemputan.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="relative scroll-mt-20 bg-[#FBFBF9] py-14 sm:py-20 lg:py-24 transition-colors dark:bg-[#070A10]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
            <HelpCircle className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
              Tanya Jawab Populer
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Informasi lengkap seputar mekanisme rental mobil, pemesanan, dan fasilitas layanan di Nabil Rental Mobil Padang.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:mt-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-[#0B0F17]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-stone-50/60 dark:hover:bg-white/5 sm:p-6"
                >
                  <span className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-100 transition-transform duration-300 dark:bg-white/10 ${
                      isOpen ? "rotate-180 bg-[#C5A059]/20 text-[#92400E] dark:text-[#FDE68A]" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-stone-100 px-5 pb-5 pt-3 dark:border-white/5 sm:px-6 sm:pb-6">
                    <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-sm dark:text-[#94A3B8]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-stone-200/80 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#0B0F17] sm:flex-row sm:justify-between sm:text-left sm:p-8">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Punya Pertanyaan Lain yang Belum Terjawab?
            </h4>
            <p className="mt-1 text-xs font-medium text-slate-600 dark:text-[#94A3B8] sm:text-sm">
              Hubungi layanan pelanggan kami melalui WhatsApp untuk respon cepat dalam 5 menit.
            </p>
          </div>

          <a
            href="https://wa.me/6282287140724?text=Halo%20Nabil%20Rental%20Mobil%20Padang%2C%20saya%20ingin%20bertanya%20seputar%20sewa%20mobil."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#25D366]/20 transition-all hover:bg-[#1EBE5D] hover:shadow-lg active:scale-98"
          >
            <Image
              src="/images/main/whatsapp.png"
              alt="WhatsApp Nabil Rental Mobil Padang"
              width={20}
              height={20}
              className="size-5 shrink-0 object-contain drop-shadow-sm"
            />
            <span>Chat CS via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
