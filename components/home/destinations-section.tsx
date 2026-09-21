import Image from "next/image"
import { Compass, Clock, MapPin, Car, ArrowUpRight } from "lucide-react"

export function DestinationsSection() {
  const touristSpots = [
    {
      title: "Jam Gadang & Ngarai Sianok",
      location: "Kota Bukittinggi",
      image: "/images/main/bukittinggi-jam-gadang.webp",
      imagePosition: "object-[center_top]",
      distance: "90 KM dari Padang",
      duration: "2.5 Jam Perjalanan",
      roadType: "Jalur aspal pegunungan berliku via Lembah Anai",
      recommendedCar: "Innova Reborn / Avanza Veloz",
      description: "Pusat wisata sejarah, kuliner Nasi Kapau, dan keindahan tebing Ngarai Sianok berhawa sejuk di dataran tinggi Minangkabau.",
      waMessage: "Halo Nabil Rental Mobil Padang, saya berencana sewa mobil untuk bepergian ke Bukittinggi. Rekomendasi unit apa yang cocok?",
    },
    {
      title: "Kawasan Wisata Bahari Mandeh",
      location: "Pesisir Selatan",
      image: "/images/main/kawasan-mandeh-bay.webp",
      imagePosition: "object-center",
      distance: "55 KM dari Padang",
      duration: "1.5 Jam Perjalanan",
      roadType: "Jalan baru aspal mulus berkelok di tepi teluk laut",
      recommendedCar: "Innova Zenix / Honda Brio",
      description: "Gugusan pulau eksotis yang dikenal sebagai Raja Ampat Sumatera Barat. Spot favorit untuk wisata bahari, snorkeling, dan santai bersama keluarga.",
      waMessage: "Halo Nabil Rental Mobil Padang, saya butuh mobil rental untuk liburan ke Kawasan Wisata Mandeh. Unit apa yang tersedia?",
    },
    {
      title: "Lembah Harau & Jembatan Kelok 9",
      location: "Kabupaten Lima Puluh Kota",
      image: "/images/main/lembah-harau-kelok9.webp",
      imagePosition: "object-center",
      distance: "135 KM dari Padang",
      duration: "3.5 Jam Perjalanan",
      roadType: "Jalan lintas provinsi lebar dan jalur tanjakan layang",
      recommendedCar: "Toyota HiAce / Fortuner GR",
      description: "Tebing granit vertikal setinggi ratusan meter yang megah dihiasi air terjun alami dan jembatan layang Kelok 9 yang spektakuler.",
      waMessage: "Halo Nabil Rental Mobil Padang, saya ingin konsultasi sewa mobil untuk rute Payakumbuh dan Lembah Harau.",
    },
    {
      title: "Bandara Internasional Minangkabau (BIM)",
      location: "Padang Pariaman",
      image: "/images/main/bim-airport.webp",
      imagePosition: "object-center",
      distance: "25 KM dari Pusat Kota",
      duration: "35 Menit Perjalanan",
      roadType: "Jalur bypass dua jalur bebas hambatan",
      recommendedCar: "Semua Tipe Kendaraan",
      description: "Pintu gerbang udara utama Sumatera Barat dengan arsitektur atap gonjong khas Minang. Nabil Rental melayani serah terima unit 24 jam langsung di bandara.",
      waMessage: "Halo Nabil Rental Mobil Padang, saya butuh sewa mobil dengan serah terima di Bandara BIM.",
    },
  ]

  return (
    <section id="wisata" className="relative scroll-mt-20 bg-[#F5F4F0] py-14 sm:py-20 lg:py-24 transition-colors dark:bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
            <Compass className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
              Panduan Wisata Minangkabau
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Informasi Destinasi Wisata Populer Sumatera Barat
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Panduan jarak tempuh, karakter jalan, dan rekomendasi mobil yang ideal bagi Anda yang merencanakan perjalanan di Ranah Minang.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {touristSpots.map((spot, index) => (
            <article
              key={index}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:border-[#C5A059]/60 hover:shadow-xl dark:border-white/10 dark:bg-[#0B0F17] dark:hover:border-[#C5A059]/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-[#070A10]">
                <Image
                  src={spot.image}
                  alt={spot.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${spot.imagePosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE68A] drop-shadow-md">
                    {spot.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-[#92400E] dark:text-white dark:group-hover:text-[#FDE68A]">
                  {spot.title}
                </h3>

                <div className="mt-3 flex flex-col gap-1.5 border-y border-stone-200/80 py-2.5 text-xs text-slate-600 dark:border-white/10 dark:text-[#94A3B8]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#92400E] dark:text-[#C5A059]" />
                    <span className="font-medium">{spot.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#92400E] dark:text-[#C5A059]" />
                    <span className="font-medium">{spot.duration}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  {spot.description}
                </p>

                <div className="mt-3 rounded-2xl bg-stone-50 p-3 dark:bg-white/5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <Car className="size-3.5 text-[#92400E] dark:text-[#C5A059]" />
                    <span>Mobil Rekomendasi:</span>
                  </div>
                  <p className="mt-0.5 text-xs font-bold text-[#92400E] dark:text-[#FDE68A]">
                    {spot.recommendedCar}
                  </p>
                </div>

                <div className="mt-auto pt-5">
                  <a
                    href={`https://wa.me/6282287140724?text=${encodeURIComponent(spot.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-stone-200/80 bg-stone-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:border-[#C5A059] hover:bg-[#C5A059]/10 hover:text-[#92400E] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#FDE68A]"
                  >
                    <span>Konsultasi Sewa Mobil</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
