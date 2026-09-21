"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Car } from "@/types/database"
import { Users, Briefcase, Gauge, Fuel, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { CarGalleryModal } from "@/components/fleet/car-gallery-modal"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const images =
    car.images && car.images.length > 0
      ? car.images
      : [
          {
            id: "fallback-img",
            car_id: car.id,
            image_url: "/images/main/car-placeholder.svg",
            is_primary: true,
            order_index: 0,
            created_at: "",
          },
        ]

  const activeImage = images[currentIndex] || images[0]

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    touchStartX.current = null
  }

  const whatsappMessage = `Halo Nabil Rental Padang, saya ingin booking mobil ${car.name}. Mohon info ketersediaan unit dan persyaratannya. Terima kasih.`
  const whatsappUrl = `https://wa.me/6282287140724?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:border-[#C5A059]/60 hover:shadow-xl dark:border-white/10 dark:bg-[#0B0F17] dark:hover:border-[#C5A059]/40">
        <div
          onClick={() => setIsModalOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-stone-100 dark:bg-[#070A10]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setIsModalOpen(true)
            }
          }}
          aria-label={`Lihat galeri foto ${car.name}`}
        >
          <Image
            src={activeImage.image_url}
            alt={`${car.name} - Tampilan ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 z-10 pointer-events-none">
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
                    ? "bg-emerald-600 dark:bg-emerald-400"
                    : car.status === "Disewa"
                    ? "bg-amber-600 dark:bg-amber-400"
                    : "bg-zinc-600 dark:bg-zinc-400"
                }`}
              />
              {car.status}
            </span>
          </div>

          {images.length > 1 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                <Camera className="size-3 text-[#C5A059]" />
                <span>
                  {currentIndex + 1}/{images.length}
                </span>
              </span>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto selanjutnya"
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(idx)
                    }}
                    aria-label={`Buka slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === idx ? "w-4 bg-[#C5A059]" : "w-1.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-[#92400E] dark:text-white dark:group-hover:text-[#FDE68A]">
            {car.name}
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-2 border-y border-stone-200/80 py-3 text-xs text-slate-600 dark:border-white/10 dark:text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Gauge className="size-4 text-[#92400E] dark:text-[#C5A059]" />
              <span className="font-medium">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#92400E] dark:text-[#C5A059]" />
              <span className="font-medium">{car.seats} Kursi</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-[#92400E] dark:text-[#C5A059]" />
              <span className="font-medium">{car.luggage} Koper</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="size-4 text-[#92400E] dark:text-[#C5A059]" />
              <span className="font-medium">{car.fuel_type || "Bensin"}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-stone-200/80 bg-stone-50 p-3.5 dark:border-transparent dark:bg-white/5">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
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
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
                + Driver
              </span>
              <span className="text-sm font-extrabold text-[#92400E] dark:text-[#FDE68A]">
                Rp {car.price_with_driver.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-[#64748B]"> / Hari</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#25D366]/20 transition-all hover:bg-[#1EBE5D] hover:shadow-lg active:scale-98"
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

      <CarGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        carName={car.name}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        whatsappUrl={whatsappUrl}
      />
    </>
  )
}
