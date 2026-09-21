"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { FileText, KeyRound, UserCheck, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"

export function TermsSection() {
  const [activeTab, setActiveTab] = useState<"lepas-kunci" | "dengan-driver">("lepas-kunci")

  const lepasKunciRequirements = [
    {
      title: "Identitas Resmi",
      description: "E-KTP asli penyewa dan penjamin (bila ada) yang masih berlaku.",
    },
    {
      title: "Lisensi Mengemudi",
      description: "SIM A aktif milik pengemudi utama yang akan mengoperasikan unit.",
    },
    {
      title: "Bukti Kedatangan / Akomodasi",
      description: "Tiket pesawat PP atau bukti reservasi hotel/penginapan di Sumatera Barat.",
    },
    {
      title: "Akun Media Sosial / Pekerjaan",
      description: "Verifikasi profil media sosial aktif atau kartu tanda pengenal instansi/kantor.",
    },
  ]

  const driverRequirements = [
    {
      title: "Identitas Pemesan",
      description: "Cukup kirimkan foto E-KTP atau kartu identitas resmi pemesan via WhatsApp.",
    },
    {
      title: "Informasi Titik Jemput",
      description: "Rincian lokasi serah terima (Bandara BIM, stasiun kereta, atau hotel di Padang).",
    },
    {
      title: "Jadwal & Rute Perjalanan",
      description: "Informasi rute tujuan agar tim driver kami dapat merencanakan estimasi waktu terbaik.",
    },
    {
      title: "Bebas Resiko Kendaraan",
      description: "Tanggung jawab teknis mobil 100% di tangan driver profesional kami.",
    },
  ]

  const bookingSteps = [
    {
      step: "01",
      title: "Pilih Mobil & Tanggal",
      description: "Pilih unit kendaraan yang sesuai dengan kapasitas dan kebutuhan rute perjalanan Anda.",
    },
    {
      step: "02",
      title: "Verifikasi via WhatsApp",
      description: "Kirim data identitas Anda ke admin untuk verifikasi cepat dalam hitungan menit.",
    },
    {
      step: "03",
      title: "Serah Terima Unit",
      description: "Mobil siap diantar tepat waktu di Bandara BIM, hotel, atau alamat tujuan Anda.",
    },
  ]

  const currentRequirements =
    activeTab === "lepas-kunci" ? lepasKunciRequirements : driverRequirements

  const waMessage =
    activeTab === "lepas-kunci"
      ? "Halo Nabil Rental Mobil Padang, saya ingin konsultasi persyaratan sewa mobil lepas kunci."
      : "Halo Nabil Rental Mobil Padang, saya ingin konsultasi sewa mobil dengan supir."

  return (
    <section id="syarat" className="relative scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24 transition-colors dark:bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
            <FileText className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
              Panduan Transparan
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Syarat & Ketentuan Sewa Mobil
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Proses verifikasi mudah, cepat, dan aman untuk kenyamanan perjalanan dinas maupun liburan keluarga Anda di Padang dan Sumatera Barat.
          </p>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <div className="inline-flex rounded-2xl border border-stone-200/80 bg-stone-100/80 p-1.5 dark:border-white/10 dark:bg-[#0B0F17]">
            <button
              onClick={() => setActiveTab("lepas-kunci")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === "lepas-kunci"
                  ? "bg-gradient-to-r from-[#C5A059] to-[#9A7B38] text-slate-950 shadow-md"
                  : "text-slate-600 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white"
              }`}
            >
              <KeyRound className="size-4" />
              <span>Sewa Lepas Kunci</span>
            </button>

            <button
              onClick={() => setActiveTab("dengan-driver")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === "dengan-driver"
                  ? "bg-gradient-to-r from-[#C5A059] to-[#9A7B38] text-slate-950 shadow-md"
                  : "text-slate-600 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white"
              }`}
            >
              <UserCheck className="size-4" />
              <span>Sewa + Supir</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E] dark:text-[#FDE68A]">
            <span>Geser persyaratan</span>
            <ArrowRight className="size-3.5 animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {currentRequirements.length} Poin
          </span>
        </div>

        <div className="mt-4 sm:mt-10 -mx-4 flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 sm:gap-4">
          {currentRequirements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="w-[75vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none"
            >
              <div className="flex h-full flex-col rounded-3xl border border-stone-200/80 bg-[#FBFBF9] p-6 shadow-sm transition-all hover:border-[#C5A059]/60 hover:shadow-md dark:border-white/10 dark:bg-[#0B0F17]">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-[#C5A059]/15 text-[#92400E] dark:text-[#FDE68A]">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#C5A059]/30 bg-gradient-to-br from-[#C5A059]/10 via-[#C5A059]/5 to-transparent p-6 sm:p-8 dark:border-[#C5A059]/20">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#C5A059] text-slate-950 shadow-md">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Butuh Bantuan atau Persyaratan Khusus Instansi?
                </h4>
                <p className="mt-1 text-xs font-medium text-slate-600 dark:text-[#94A3B8] sm:text-sm">
                  Tim customer service kami siap membantu verifikasi dokumen dan menerbitkan invoice resmi untuk keperluan kedinasan / perusahaan.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/6282287140724?text=${encodeURIComponent(waMessage)}`}
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
              <span>Tanya Syarat via WA</span>
            </a>
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#92400E] dark:text-[#FDE68A]">
                Proses Pemesanan
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Cara Mudah Sewa Mobil dalam 3 Langkah
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E] dark:text-[#FDE68A] sm:hidden">
              <span>Geser</span>
              <ArrowRight className="size-3.5 animate-pulse" />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 -mx-4 flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-6">
            {bookingSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="w-[78vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none"
              >
                <div className="relative flex h-full flex-col rounded-3xl border border-stone-200/80 bg-[#FBFBF9] p-6 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black tracking-tight text-[#C5A059]/40 dark:text-[#C5A059]/30">
                      {step.step}
                    </span>
                    {idx < 2 && (
                      <ArrowRight className="hidden size-5 text-[#C5A059]/60 md:block" />
                    )}
                  </div>
                  <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
