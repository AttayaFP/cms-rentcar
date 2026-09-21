import Image from "next/image"
import { MapPin, Navigation, Clock, ShieldCheck, Phone } from "lucide-react"

export function LocationSection() {
  const mapsDirectUrl = "https://www.google.com/maps/place/SEWA+TOYOTA+HIACE+PADANG+%7C%7C+RENTAL+MOBIL+PADANG.N_RENTCARPADANG/@-0.8830518,100.3591148,19z"
  const whatsappUrl = "https://wa.me/6282287140724?text=Halo%20Nabil%20Rental%20Padang%2C%20saya%20ingin%20tanya%20titik%20penjemputan%20atau%20alamat%20kantor."

  return (
    <section id="lokasi" className="relative py-24 bg-[#F5F4F0] dark:bg-[#06080C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#92400E] dark:text-[#FDE68A]">
              Kantor &amp; Pool Resmi
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Kunjungi Pool Kendaraan Kami di Padang
          </h2>

          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Unit selalu siap di pool untuk inspeksi langsung. Kami juga melayani serah terima 24 jam di Bandara Internasional Minangkabau (BIM), hotel, dan stasiun.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xl sm:p-8 lg:col-span-5 dark:border-white/10 dark:bg-[#0B0F17]">
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-lg bg-amber-50 px-3 py-1 text-xs font-extrabold text-[#92400E] dark:bg-amber-950/50 dark:text-[#FDE68A]">
                  Terverifikasi Google Maps
                </span>
                <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                  SEWA TOYOTA HIACE PADANG || RENTAL MOBIL PADANG
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm dark:text-[#94A3B8]">
                  Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat. Berada di lokasi strategis dekat jalur utama penghubung Bandara BIM dan pusat Kota Padang.
                </p>
              </div>

              <div className="space-y-3.5 border-y border-stone-200/80 py-6 dark:border-white/10">
                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#92400E] dark:bg-white/5 dark:text-[#FDE68A]">
                    <MapPin className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Alamat Workshop &amp; Pool</p>
                    <p className="text-xs text-slate-600 dark:text-[#94A3B8]">Komplek Perumdam III/4, Tunggul Hitam, Kota Padang</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#92400E] dark:bg-white/5 dark:text-[#FDE68A]">
                    <Clock className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Jam Operasional Pool</p>
                    <p className="text-xs text-slate-600 dark:text-[#94A3B8]">Buka 24 Jam Setiap Hari (Senin - Minggu)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#92400E] dark:bg-white/5 dark:text-[#FDE68A]">
                    <ShieldCheck className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Layanan Antar Jemput</p>
                    <p className="text-xs text-slate-600 dark:text-[#94A3B8]">Gratis antar jemput di area Bandara BIM &amp; Hotel Kota Padang</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#92400E] dark:bg-white/5 dark:text-[#FDE68A]">
                    <Phone className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Hotline Reservasi</p>
                    <p className="text-xs font-bold text-[#92400E] dark:text-[#FDE68A]">0822-8714-0724</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-slate-800 active:scale-98 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <Navigation className="size-4 text-[#FDE68A] dark:text-[#B45309]" />
                <span>Petunjuk Arah Maps</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/20 transition-all hover:brightness-105 active:scale-98"
              >
                <Image
                  src="/images/main/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="size-5 shrink-0 object-contain"
                />
                <span>Hubungi CS Pool</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xl lg:col-span-7 lg:min-h-[460px] dark:border-white/10 dark:bg-[#0B0F17]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d249.33402934609964!2d100.3591148!3d-0.8830518!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4c7c84d933eff%3A0x2755132c5c3499b7!2sSEWA%20TOYOTA%20HIACE%20PADANG%20%7C%7C%20RENTAL%20MOBIL%20PADANG.N_RENTCARPADANG!5e0!3m2!1sid!2sid!4v1790017293031!5m2!1sid!2sid"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi SEWA TOYOTA HIACE PADANG Nabil Rental Padang"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
