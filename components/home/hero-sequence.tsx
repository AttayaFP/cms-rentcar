"use client"

import { useEffect, useRef, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { ChevronDown, ShieldCheck, MapPin } from "lucide-react"

const TOTAL_FRAMES = 102

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const currentFrameRef = useRef(1)
  const animationFrameRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const images: HTMLImageElement[] = []

    const firstImage = new Image()
    firstImage.src = "/sequence/frame_001.webp"
    firstImage.onload = () => {
      images[1] = firstImage
      setIsLoaded(true)
      renderFrame(1)
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1) continue
      const img = new Image()
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}.webp`
      images[i] = img
    }

    imagesRef.current = images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imagesRef.current[frameIndex] || imagesRef.current[1]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
    }

    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = displayWidth / displayHeight

    let drawWidth: number
    let drawHeight: number
    let offsetX = 0
    let offsetY = 0

    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth * dpr
      drawHeight = (displayWidth * dpr) / imgAspect
      offsetY = (displayHeight * dpr - drawHeight) / 2
    } else {
      drawHeight = displayHeight * dpr
      drawWidth = (displayHeight * dpr) * imgAspect
      offsetX = (displayWidth * dpr - drawWidth) / 2
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isVisibleRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance))
      setScrollProgress(rawProgress)

      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(rawProgress * (TOTAL_FRAMES - 1)) + 1)
      )

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          renderFrame(targetFrame)
        })
      }
    }

    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [isLoaded])

  const scrollToFleet = () => {
    const element = document.getElementById("armada")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={containerRef} className="relative h-[320vh] w-full bg-[#070A10]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A10] via-black/40 to-[#070A10]/70" />

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-700 ${
            scrollProgress < 0.28 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center rounded-full border border-[#D4AF37]/50 bg-black/70 px-5 py-1.5 shadow-xl backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FDE68A]">
              Nabil Rental Padang
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-5xl md:text-6xl lg:text-7xl">
            Eksplorasi Ranah Minang{" "}
            <span className="bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-md">
              Tanpa Ragu
            </span>
          </h1>

          <div className="mt-4 max-w-2xl rounded-2xl border border-white/15 bg-black/60 px-6 py-3.5 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-medium leading-relaxed text-white sm:text-base md:text-lg">
              Sewa mobil terpercaya di Padang dengan layanan antar jemput Bandara BIM 24 jam,
              armada terawat prima untuk rute Bukittinggi, Mandeh, dan Lembah Harau.
            </p>
          </div>

          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-2">
            <button
              onClick={scrollToFleet}
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-6 text-sm font-bold text-[#0F172A] shadow-xl shadow-[#D4AF37]/30 transition-transform active:scale-95"
            >
              Lihat Armada Mobil
            </button>

            <div className="mt-4 flex flex-col items-center gap-1 rounded-full bg-black/50 px-4 py-1.5 backdrop-blur-md">
              <span className="text-xs font-semibold text-white">Gulir untuk menjelajah</span>
              <div className="size-8">
                <DotLottieReact
                  src="/lottie/scroll down.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-700 ${
            scrollProgress >= 0.32 && scrollProgress < 0.7
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-1.5 shadow-xl backdrop-blur-md">
            <MapPin className="size-4 text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Kenyamanan Lintas Jalur Sumatera
            </span>
          </div>

          <h2 className="mt-5 max-w-3xl text-2xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-4xl md:text-5xl">
            Tangguh Menembus Tanjakan Sitinjau Lauik &amp; Kelok 44
          </h2>

          <div className="mt-3 max-w-xl rounded-2xl border border-white/15 bg-black/65 px-6 py-3 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-medium leading-relaxed text-white sm:text-sm md:text-base">
              Seluruh kendaraan melalui inspeksi berkala sebelum serah terima. Siap untuk kebutuhan dinas,
              keluarga, hingga eksplorasi wisata alam.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-black/80 px-5 py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-extrabold text-[#FDE68A]">Lepas Kunci</p>
              <p className="mt-0.5 text-xs font-medium text-white">Syarat transparan &amp; cepat</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/80 px-5 py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-extrabold text-[#FDE68A]">Dengan Driver</p>
              <p className="mt-0.5 text-xs font-medium text-white">Supir Urang Awak berpengalaman</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/80 px-5 py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-extrabold text-[#FDE68A]">Antar Bandara BIM</p>
              <p className="mt-0.5 text-xs font-medium text-white">Serah terima langsung 24 jam</p>
            </div>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-700 ${
            scrollProgress >= 0.74 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-black/80 px-4 py-1.5 shadow-xl backdrop-blur-md">
            <ShieldCheck className="size-4 text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Pemesanan Cepat &amp; Praktis
            </span>
          </div>

          <h2 className="mt-5 max-w-2xl text-2xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-4xl md:text-5xl">
            Tentukan Armada Pilihan Anda
          </h2>

          <div className="mt-3 max-w-lg rounded-2xl border border-white/15 bg-black/65 px-6 py-3 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-medium leading-relaxed text-white sm:text-sm md:text-base">
              Pilih unit mobil yang Anda butuhkan di bawah ini dan konfirmasi pemesanan langsung dengan owner via WhatsApp.
            </p>
          </div>

          <div className="pointer-events-auto mt-6">
            <button
              onClick={scrollToFleet}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-6 text-sm font-bold text-[#0F172A] shadow-2xl shadow-[#D4AF37]/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Telusuri Daftar Mobil</span>
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
