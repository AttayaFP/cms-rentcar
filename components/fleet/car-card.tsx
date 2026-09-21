import Image from "next/image"
import { Car } from "@/types/database"
import { Users, Briefcase, Gauge, Fuel } from "lucide-react"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const primaryImage =
    car.images?.find((img) => img.is_primary)?.image_url ||
    car.images?.[0]?.image_url ||
    "/images/main/car-placeholder.svg"

  const whatsappMessage = `Halo Nabil Rental Padang, saya ingin booking mobil ${car.name}. Mohon info ketersediaan unit dan persyaratannya. Terima kasih.`
  const whatsappUrl = `https://wa.me/6282279690769?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-[#D4AF37] hover:shadow-xl dark:border-white/10 dark:bg-[#0B0F17] dark:hover:border-[#D4AF37]/50">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#070A10]">
        <Image
          src={primaryImage}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-md shadow-sm ${
              car.status === "Tersedia"
                ? "border border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400"
                : car.status === "Disewa"
                ? "border border-amber-500/40 bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400"
                : "border border-zinc-400 bg-zinc-100 text-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                car.status === "Tersedia"
                  ? "bg-emerald-600 animate-pulse dark:bg-emerald-400"
                  : car.status === "Disewa"
                  ? "bg-amber-600 dark:bg-amber-400"
                  : "bg-zinc-600 dark:bg-zinc-400"
              }`}
            />
            {car.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-[#B45309] dark:text-white dark:group-hover:text-[#FDE68A]">
          {car.name}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-xs text-slate-600 dark:border-white/10 dark:text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <Gauge className="size-4 text-[#B45309] dark:text-[#D4AF37]" />
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-[#B45309] dark:text-[#D4AF37]" />
            <span className="font-medium">{car.seats} Kursi</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-[#B45309] dark:text-[#D4AF37]" />
            <span className="font-medium">{car.luggage} Koper</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="size-4 text-[#B45309] dark:text-[#D4AF37]" />
            <span className="font-medium">{car.fuel_type || "Bensin"}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-transparent dark:bg-white/5">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
              Lepas Kunci
            </span>
            {car.price_self_drive > 0 ? (
              <>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Rp {car.price_self_drive.toLocaleString("id-ID")}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-[#64748B]"> / 24 Jam</span>
              </>
            ) : (
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Khusus Driver
              </span>
            )}
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
              + Driver
            </span>
            <span className="text-sm font-extrabold text-[#B45309] dark:text-[#D4AF37]">
              Rp {car.price_with_driver.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-[#64748B]"> / Hari</span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#25D366]/25 transition-all hover:bg-[#20bd5a] hover:shadow-lg active:scale-98"
        >
          <Image
            src="/images/main/whatsapp.png"
            alt="WhatsApp Nabil Rental Padang"
            width={20}
            height={20}
            className="size-5 shrink-0 object-contain drop-shadow-sm"
          />
          <span>Sewa via WhatsApp</span>
        </a>
      </div>
    </article>
  )
}
