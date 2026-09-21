"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Car } from "@/types/database"
import { updateCarStatusAction, deleteCarAction } from "@/actions/cars"
import { Edit3, Trash2, CheckCircle2, AlertCircle, Wrench, Search } from "lucide-react"

interface CarsTableProps {
  initialCars: Car[]
}

export function CarsTable({ initialCars }: CarsTableProps) {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [search, setSearch] = useState("")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const filteredCars = cars.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleStatusChange = async (
    id: string,
    newStatus: "Tersedia" | "Disewa" | "Perawatan"
  ) => {
    setIsUpdating(id)
    const res = await updateCarStatusAction(id, newStatus)
    if (res.success) {
      setCars((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      )
    }
    setIsUpdating(null)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus unit ${name}? Tindakan ini tidak dapat dibatalkan.`)) {
      return
    }
    setIsUpdating(id)
    const res = await deleteCarAction(id)
    if (res.success) {
      setCars((prev) => prev.filter((c) => c.id !== id))
    }
    setIsUpdating(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-[#0B0F17]">
        <Search className="size-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari armada berdasarkan nama mobil..."
          className="w-full bg-transparent text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-stone-200 bg-stone-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="py-3.5 pl-4">Foto & Unit</th>
                <th className="py-3.5">Spesifikasi</th>
                <th className="py-3.5">Lepas Kunci</th>
                <th className="py-3.5">+ Driver</th>
                <th className="py-3.5">Ubah Status</th>
                <th className="py-3.5 pr-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-white/5">
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Tidak ada unit mobil yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredCars.map((car) => {
                  const img = car.images?.[0]?.image_url || "/images/main/car-placeholder.svg"
                  return (
                    <tr key={car.id} className="hover:bg-stone-50/60 dark:hover:bg-white/5">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10">
                            <Image
                              src={img}
                              alt={car.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block sm:text-sm">
                              {car.name}
                            </span>
                            <span className="text-[11px] text-[#C5A059] font-medium">
                              {car.images?.length || 1} Foto Terunggah
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 font-medium text-slate-600 dark:text-slate-300">
                        <div>{car.transmission}</div>
                        <div className="text-[11px] text-slate-400">
                          {car.seats} Kursi • {car.fuel_type || "Bensin"}
                        </div>
                      </td>

                      <td className="py-4 font-bold text-slate-900 dark:text-white">
                        {car.price_self_drive > 0
                          ? `Rp ${car.price_self_drive.toLocaleString("id-ID")}`
                          : "Khusus Driver"}
                      </td>

                      <td className="py-4 font-bold text-[#92400E] dark:text-[#FDE68A]">
                        {car.price_with_driver > 0
                          ? `Rp ${car.price_with_driver.toLocaleString("id-ID")}`
                          : "Hubungi Admin"}
                      </td>

                      <td className="py-4">
                        <select
                          disabled={isUpdating === car.id}
                          value={car.status}
                          onChange={(e) =>
                            handleStatusChange(
                              car.id,
                              e.target.value as "Tersedia" | "Disewa" | "Perawatan"
                            )
                          }
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold outline-none transition-colors ${
                            car.status === "Tersedia"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400"
                              : car.status === "Disewa"
                              ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-400"
                              : "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-400"
                          }`}
                        >
                          <option value="Tersedia">Tersedia (Ready)</option>
                          <option value="Disewa">Sedang Disewa</option>
                          <option value="Perawatan">Dalam Servis</option>
                        </select>
                      </td>

                      <td className="py-4 pr-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/admin/cars/${car.id}/edit`}
                            className="flex size-8 items-center justify-center rounded-lg bg-stone-100 text-slate-700 transition-colors hover:bg-stone-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                            title="Edit Data Mobil"
                          >
                            <Edit3 className="size-4" />
                          </Link>
                          <button
                            disabled={isUpdating === car.id}
                            onClick={() => handleDelete(car.id, car.name)}
                            className="flex size-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-400 dark:hover:bg-rose-900/50"
                            title="Hapus Mobil"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
