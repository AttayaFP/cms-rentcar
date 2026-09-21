"use client"

import { useState } from "react"
import { Car, Category } from "@/types/database"
import { CarCard } from "@/components/fleet/car-card"
import { Car as CarIcon } from "lucide-react"

interface FleetSectionProps {
  initialCars?: Car[]
  categories?: Category[]
}

const DEFAULT_CARS: Car[] = [
  {
    id: "default-1",
    category_id: "family-mpv",
    name: "Toyota Innova Reborn 2.4 G Diesel",
    slug: "innova-reborn-diesel",
    transmission: "Otomatis",
    fuel_type: "Solar Dex",
    seats: 7,
    luggage: 3,
    price_self_drive: 450000,
    price_with_driver: 650000,
    status: "Tersedia",
    is_featured: true,
    description: "Mobil terfavorit perjalanan dinas dan keluarga di Sumatera Barat. Sangat bertenaga di tanjakan Sitinjau Lauik.",
    features: ["AC Double Blower", "Audio Touchscreen", "Kamera Mundur", "Captain Seat"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-1", car_id: "default-1", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  },
  {
    id: "default-2",
    category_id: "family-mpv",
    name: "Toyota Avanza Veloz New",
    slug: "avanza-veloz-new",
    transmission: "Manual",
    fuel_type: "Bensin",
    seats: 7,
    luggage: 2,
    price_self_drive: 350000,
    price_with_driver: 500000,
    status: "Tersedia",
    is_featured: true,
    description: "Ekonomis, lincah, dan nyaman untuk mobilitas di Kota Padang maupun rute Bukittinggi.",
    features: ["AC Dingin", "Wireless Charger", "Dual Airbags"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-2", car_id: "default-2", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  },
  {
    id: "default-3",
    category_id: "executive-suv",
    name: "Toyota Innova Zenix 2.0 V",
    slug: "innova-zenix-v",
    transmission: "Otomatis",
    fuel_type: "Bensin",
    seats: 7,
    luggage: 3,
    price_self_drive: 600000,
    price_with_driver: 800000,
    status: "Tersedia",
    is_featured: true,
    description: "Generasi terbaru dengan suspensi empuk TNGA, kabin kedap, dan kenyamanan setara kelas eksekutif.",
    features: ["Panoramic Sunroof", "Paddle Shift", "Ambient Light"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-3", car_id: "default-3", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  },
  {
    id: "default-4",
    category_id: "executive-suv",
    name: "Toyota Fortuner 2.8 GR Sport",
    slug: "fortuner-gr-sport",
    transmission: "Otomatis",
    fuel_type: "Solar Dex",
    seats: 7,
    luggage: 3,
    price_self_drive: 950000,
    price_with_driver: 1250000,
    status: "Tersedia",
    is_featured: true,
    description: "SUV gagah untuk kebutuhan VIP, protokoler kedinasan, dan medan berat perbukitan Sumatera Barat.",
    features: ["4x2 GR Package", "Power Backdoor", "Blind Spot Monitor"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-4", car_id: "default-4", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  },
  {
    id: "default-5",
    category_id: "minibus-wisata",
    name: "Toyota HiAce Premio Luxury",
    slug: "hiace-premio-luxury",
    transmission: "Manual",
    fuel_type: "Solar Dex",
    seats: 12,
    luggage: 5,
    price_self_drive: 0,
    price_with_driver: 1300000,
    status: "Tersedia",
    is_featured: true,
    description: "Pilihan utama rombongan tour Mandeh dan Harau. Kapasitas luas, legroom lega, dan suspensi nyaman.",
    features: ["Reclining Seats", "Kabin Tinggi", "Port USB di Setiap Baris"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-5", car_id: "default-5", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  },
  {
    id: "default-6",
    category_id: "city-car",
    name: "Honda Brio RS Facelift",
    slug: "honda-brio-rs",
    transmission: "Otomatis",
    fuel_type: "Bensin",
    seats: 5,
    luggage: 1,
    price_self_drive: 300000,
    price_with_driver: 450000,
    status: "Tersedia",
    is_featured: false,
    description: "City car paling gesit dan hemat BBM. Pilihan tepat untuk keliling kulineran di Kota Padang.",
    features: ["Smart Entry", "Display Audio 7 inch", "Velg Alloy 15 inch"],
    created_at: new Date().toISOString(),
    images: [{ id: "img-6", car_id: "default-6", image_url: "/images/main/car-placeholder.svg", is_primary: true, order_index: 0, created_at: "" }]
  }
]

export function FleetSection({ initialCars }: FleetSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const cars = initialCars && initialCars.length > 0 ? initialCars : DEFAULT_CARS

  const filterTabs = [
    { id: "all", label: "Semua Armada" },
    { id: "family-mpv", label: "Family MPV" },
    { id: "executive-suv", label: "Executive SUV" },
    { id: "minibus-wisata", label: "Minibus HiAce" },
    { id: "city-car", label: "City Car" }
  ]

  const filteredCars =
    selectedCategory === "all"
      ? cars
      : cars.filter((car) => car.category_id === selectedCategory)

  return (
    <section id="armada" className="relative scroll-mt-20 bg-[#FBFBF9] py-14 sm:py-20 lg:py-24 transition-colors dark:bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 shadow-sm">
            <CarIcon className="size-4 text-[#92400E] dark:text-[#FDE68A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] dark:text-[#FDE68A]">
              Pilihan Kendaraan Prima
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Katalog Armada Nabil Rental Padang
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600 sm:text-base dark:text-[#94A3B8]">
            Seluruh unit bersih wangi, servis berkala tepat waktu, dan siap melayani sewa harian, mingguan, hingga bulanan di Sumatera Barat.
          </p>
        </div>

        <div className="mt-8 -mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:mt-10 sm:justify-center sm:px-0">
          <div className="inline-flex gap-2 rounded-2xl border border-stone-200/80 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-gradient-to-r from-[#C5A059] to-[#9A7B38] text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
