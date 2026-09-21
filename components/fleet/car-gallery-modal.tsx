"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { CarImage } from "@/types/database"

interface CarGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: CarImage[]
  carName: string
  currentIndex: number
  onIndexChange: (index: number) => void
  whatsappUrl: string
}

export function CarGalleryModal({
  isOpen,
  onClose,
  images,
  carName,
  currentIndex,
  onIndexChange,
  whatsappUrl,
}: CarGalleryModalProps) {
  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onIndexChange])

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onIndexChange])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen || images.length === 0) return null

  const activeImage = images[currentIndex] || images[0]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri foto ${carName}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white sm:text-base line-clamp-1">{carName}</span>
          <span className="text-xs text-[#C5A059] font-medium">
            Foto {currentIndex + 1} dari {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Tutup galeri"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
        >
          <X className="size-5" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        <div className="relative aspect-[16/10] w-full max-w-4xl max-h-[60vh] sm:max-h-[68vh] overflow-hidden rounded-2xl bg-black/40 shadow-2xl">
          <Image
            src={activeImage.image_url}
            alt={`${carName} - Foto ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Foto selanjutnya"
            className="absolute right-2 sm:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      <div
        className="flex flex-col gap-3 border-t border-white/10 bg-black/60 p-4 sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => onIndexChange(idx)}
                aria-label={`Pilih foto ${idx + 1}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  currentIndex === idx
                    ? "border-[#C5A059] scale-105 shadow-md shadow-[#C5A059]/30"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-md items-center justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#1EBE5D] hover:shadow-xl active:scale-98"
          >
            <Image
              src="/images/main/whatsapp.png"
              alt="WhatsApp Nabil Rental Mobil Padang"
              width={20}
              height={20}
              className="size-5 shrink-0 object-contain drop-shadow-sm"
            />
            <span>Sewa Unit Ini Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  )
}
