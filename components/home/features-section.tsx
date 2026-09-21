"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { ShieldCheck, Mountain, Clock, Award, FileText, CheckCircle2 } from "lucide-react"

export function FeaturesSection() {
  const requirementsSelfDrive = [
    "KTP Asli Penyewa",
    "SIM A Masih Berlaku",
    "Akun Media Sosial Aktif (Instagram / Facebook / LinkedIn)",
    "Bukti Tiket Pesawat Kedatangan / Tiket Kereta / Booking Hotel di Padang",
    "Kartu Pegawai / ID Card Kantor / NPWP (atau Jaminan Motor)",
  ]

  const requirementsWithDriver = [
    "Tanpa jaminan dokumen berbelit-belit",
    "Cukup konfirmasi jadwal penjemputan dan nama pemesan",
    "Termasuk supir Urang Awak yang sopan, ramah, dan paham rute wisata",
    "Durasi fleksibel mengikuti kebutuhan agenda perjalanan",
  ]

  return (
    <section id="keunggulan" className="relative scroll-mt-20 border-t border-stone-200/80 bg-[#FBFBF9] py-14 sm:py-20 lg:py-24 transition-colors dark:border-white/10 dark:bg-[#05080E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
              <Award className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
                Standar Layanan Nabil Rental
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Mengapa Memilih Sewa Mobil di Nabil Rental Padang?
            </h2>

            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base dark:text-[#94A3B8]">
              Kami memahami kondisi geografis Sumatera Barat yang menantang: jalan berliku, tanjakan curam, dan cuaca pegunungan. Seluruh unit kami dirawat dengan standar ketat untuk menjamin keselamatan keluarga dan rekan kerja Anda.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200/80 bg-white text-[#92400E] shadow-sm dark:border-[#C5A059]/30 dark:bg-[#0F172A] dark:text-[#C5A059]">
                  <Mountain className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Tangguh di Jalur Tanjakan Ekstrem
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm dark:text-[#94A3B8]">
                    Mesin prima, kampas rem tebal, dan ban bertapak tebal. Aman melibas jalur Sitinjau Lauik, Kelok 44 Maninjau, hingga Lembah Anai.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200/80 bg-white text-[#92400E] shadow-sm dark:border-[#C5A059]/30 dark:bg-[#0F172A] dark:text-[#C5A059]">
                  <Clock className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Antar Jemput Bandara BIM 24 Jam
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm dark:text-[#94A3B8]">
                    Mendarat dini hari atau malam di Bandara Minangkabau? Tim kami siap menyerahkan unit di area parkir bandara tepat waktu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200/80 bg-white text-[#92400E] shadow-sm dark:border-[#C5A059]/30 dark:bg-[#0F172A] dark:text-[#C5A059]">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kabin Bersih &amp; Bebas Bau Asap Rokok
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm dark:text-[#94A3B8]">
                    Setiap mobil dicuci bersih luar dalam dan diberi pewangi aromaterapi segar sebelum diserahkan kepada penyewa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="syarat" className="scroll-mt-24 lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0B0F17] sm:p-8">
              <div className="flex items-center gap-4 border-b border-stone-200/80 pb-6 dark:border-white/10">
                <div className="size-14 shrink-0 overflow-hidden rounded-2xl bg-stone-50 shadow-sm dark:bg-[#0F172A]">
                  <DotLottieReact
                    src="/lottie/Safe done.lottie"
                    loop
                    autoplay
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
                    Verifikasi Resmi &amp; Cepat
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Persyaratan Sewa Transparan
                  </h3>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FDE68A]">
                  <FileText className="size-4 text-[#92400E] dark:text-[#C5A059]" />
                  <span>Syarat Sewa Lepas Kunci (Self-Drive)</span>
                </h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {requirementsSelfDrive.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 sm:text-sm dark:text-[#CBD5E1]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-stone-200/80 pt-6 dark:border-white/10">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FDE68A]">
                  <Award className="size-4 text-[#92400E] dark:text-[#C5A059]" />
                  <span>Sewa Mobil Dengan Supir</span>
                </h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {requirementsWithDriver.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 sm:text-sm dark:text-[#CBD5E1]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#92400E] dark:text-[#C5A059]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
