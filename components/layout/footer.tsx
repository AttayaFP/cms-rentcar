import Image from "next/image"
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 transition-colors dark:border-white/10 dark:bg-[#05080E] dark:text-[#94A3B8]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="relative h-12 w-48">
              <Image
                src="/brand/logo-light.svg"
                alt="Nabil Rental Mobil Padang"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-300 dark:text-[#94A3B8]">
              Jasa rental mobil terpercaya di Padang, Sumatera Barat. Melayani sewa mobil lepas kunci dan dengan supir profesional untuk kebutuhan wisata, keluarga, dan kedinasan.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FDE68A] dark:text-[#D4AF37]">
              <ShieldCheck className="size-4" />
              <span>Armada Terawat &amp; Siap Jalan</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Layanan Sewa
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>Sewa Mobil Lepas Kunci Padang</li>
              <li>Rental Mobil Dengan Supir Urang Awak</li>
              <li>Antar Jemput Bandara BIM 24 Jam</li>
              <li>Sewa Mobil Harian, Mingguan &amp; Bulanan</li>
              <li>Kendaraan Operasional Perusahaan</li>
              <li>Mobil Pengawalan &amp; Acara Kedinasan</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Destinasi Populer
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>Kota Padang &amp; Pantai Padang</li>
              <li>Bandara Internasional Minangkabau (BIM)</li>
              <li>Kota Wisata Bukittinggi</li>
              <li>Lembah Harau &amp; Kelok 9 Payakumbuh</li>
              <li>Kawasan Wisata Bahari Mandeh</li>
              <li>Danau Maninjau &amp; Kelok 44</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kontak &amp; Garasi
            </h3>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#FDE68A] dark:text-[#D4AF37]" />
              <span>Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="size-4 shrink-0 text-[#FDE68A] dark:text-[#D4AF37]" />
              <a href="tel:082287140724" className="hover:text-white">
                0822-8714-0724
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <MessageCircle className="size-4 shrink-0 text-[#25D366]" />
              <a
                href="https://wa.me/6282287140724"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                +62 822-8714-0724 (WhatsApp)
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="size-4 shrink-0 text-[#FDE68A] dark:text-[#D4AF37]" />
              <span>Operasional 24 Jam Setiap Hari</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row dark:border-white/10 dark:text-[#64748B]">
          <p>&copy; {new Date().getFullYear()} Nabil Rental Mobil Padang. Seluruh hak cipta dilindungi.</p>
          <p>Rental Mobil Nomor 1 di Sumatera Barat</p>
        </div>
      </div>
    </footer>
  )
}
