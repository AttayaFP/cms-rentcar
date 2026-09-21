"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useLenis } from "lenis/react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { ChevronDown, ShieldCheck, MapPin } from "lucide-react"

const TOTAL_FRAMES = 102

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const currentFrameRef = useRef(1)
  const isVisibleRef = useRef(true)

  const lenis = useLenis()

  const renderFrame = useCallback((frameIndex: number) => {
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
  }, [])

  useEffect(() => {
    const images: HTMLImageElement[] = []

    const firstImage = new Image()
    firstImage.src = "/sequence/frame_001.webp"
    firstImage.onload = () => {
      images[1] = firstImage
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

    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [renderFrame])

  useLenis(() => {
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
      renderFrame(targetFrame)
    }
  })

  const scrollToFleet = () => {
    if (lenis) {
      lenis.scrollTo("#armada", { offset: -70, duration: 1.2 })
    } else {
      const element = document.getElementById("armada")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section ref={containerRef} className="relative h-[220vh] sm:h-[300vh] w-full bg-[#070A10]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A10] via-black/40 to-[#070A10]/70" />

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-out ${
            scrollProgress < 0.28
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center rounded-full border border-[#D4AF37]/50 bg-black/75 px-3.5 py-1 sm:px-5 sm:py-1.5 shadow-2xl backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDE68A] sm:text-xs sm:tracking-[0.25em]">
              Nabil Rental Mobil Padang
            </span>
          </div>

          <h1 className="mt-3 max-w-4xl text-2xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Eksplorasi Ranah Minang{" "}
            <span className="bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-md">
              Tanpa Ragu
            </span>
          </h1>

          <div className="mt-3 max-w-xl rounded-xl border border-white/20 bg-black/70 px-4 py-2.5 sm:mt-4 sm:rounded-2xl sm:px-6 sm:py-4 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-medium leading-relaxed text-white sm:text-base md:text-lg">
              Sewa mobil terpercaya di Padang dengan layanan antar jemput Bandara BIM 24 jam,
              armada terawat prima untuk rute Bukittinggi, Mandeh, dan Lembah Harau.
            </p>
          </div>

          <div className="pointer-events-auto mt-4 sm:mt-8 flex flex-col items-center gap-2 sm:gap-3">
            <button
              onClick={scrollToFleet}
              className="inline-flex h-12 w-full max-w-[240px] sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-6 text-xs sm:text-sm font-bold text-[#0F172A] shadow-xl shadow-[#D4AF37]/30 transition-all hover:brightness-110 active:scale-95"
            >
              Lihat Armada Mobil
            </button>

            <div className="hidden sm:flex mt-2 flex-col items-center gap-1 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 backdrop-blur-md">
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
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-out ${
            scrollProgress >= 0.32 && scrollProgress < 0.7
              ? "translate-y-0 opacity-100"
              : scrollProgress < 0.32
              ? "translate-y-4 opacity-0"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3.5 py-1 sm:px-4 sm:py-1.5 shadow-2xl backdrop-blur-md">
            <MapPin className="size-3.5 text-[#FDE68A] sm:size-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
              Kenyamanan Lintas Jalur Sumatera
            </span>
          </div>

          <h2 className="mt-3 max-w-3xl text-xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] sm:mt-5 sm:text-4xl md:text-5xl">
            Tangguh Menembus Tanjakan Sitinjau Lauik &amp; Kelok 44
          </h2>

          <div className="mt-2.5 max-w-lg rounded-xl border border-white/20 bg-black/70 px-4 py-2 sm:mt-3 sm:rounded-2xl sm:px-6 sm:py-3.5 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-medium leading-relaxed text-white sm:text-sm md:text-base">
              Seluruh kendaraan melalui inspeksi berkala sebelum serah terima. Siap untuk kebutuhan dinas,
              keluarga, hingga eksplorasi wisata alam.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3 w-full max-w-xl">
            <div className="rounded-xl border border-white/20 bg-black/85 p-2 sm:px-5 sm:py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-xs sm:text-sm font-extrabold text-[#FDE68A]">Lepas Kunci</p>
              <p className="hidden sm:block mt-0.5 text-xs font-medium text-white">Syarat transparan &amp; cepat</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/85 p-2 sm:px-5 sm:py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-xs sm:text-sm font-extrabold text-[#FDE68A]">Dengan Driver</p>
              <p className="hidden sm:block mt-0.5 text-xs font-medium text-white">Supir Urang Awak berpengalaman</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/85 p-2 sm:px-5 sm:py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-xs sm:text-sm font-extrabold text-[#FDE68A]">Antar BIM</p>
              <p className="hidden sm:block mt-0.5 text-xs font-medium text-white">Serah terima langsung 24 jam</p>
            </div>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-out ${
            scrollProgress >= 0.74
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-black/80 px-3.5 py-1 sm:px-4 sm:py-1.5 shadow-2xl backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-[#FDE68A] sm:size-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
              Pemesanan Cepat &amp; Praktis
            </span>
          </div>

          <h2 className="mt-3 max-w-2xl text-xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] sm:mt-5 sm:text-4xl md:text-5xl">
            Tentukan Armada Pilihan Anda
          </h2>

          <div className="mt-2.5 max-w-md rounded-xl border border-white/20 bg-black/70 px-4 py-2 sm:mt-3 sm:rounded-2xl sm:px-6 sm:py-3.5 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-medium leading-relaxed text-white sm:text-sm md:text-base">
              Pilih unit mobil yang Anda butuhkan di bawah ini dan konfirmasi pemesanan langsung dengan owner via WhatsApp.
            </p>
          </div>

          <div className="pointer-events-auto mt-4 sm:mt-6">
            <button
              onClick={scrollToFleet}
              className="inline-flex h-12 w-full max-w-[240px] sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-6 text-xs sm:text-sm font-bold text-[#0F172A] shadow-2xl shadow-[#D4AF37]/30 transition-all hover:brightness-110 active:scale-95"
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
