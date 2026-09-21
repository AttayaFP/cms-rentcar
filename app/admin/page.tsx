import Link from "next/link"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/server"
import { Car as CarIcon, CheckCircle2, AlertCircle, Wrench, PlusCircle, ArrowRight } from "lucide-react"
import { Car } from "@/types/database"

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()

  const { data: carsData } = await supabase
    .from("cars")
    .select("*, images:car_images(*)")
    .order("created_at", { ascending: false })

  const cars: Car[] = carsData || []

  const totalCars = cars.length
  const tersediaCars = cars.filter((c) => c.status === "Tersedia").length
  const disewaCars = cars.filter((c) => c.status === "Disewa").length
  const perawatanCars = cars.filter((c) => c.status === "Perawatan").length

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Ringkasan Armada Mobil
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#94A3B8] sm:text-sm">
          Pantau status ketersediaan unit, penetapan tarif sewa, dan pengelolaan armada Nabil Rental Mobil Padang.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <CarIcon className="size-5" />
          </div>
          <span className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            {totalCars}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-[#94A3B8]">
            Total Armada Terdaftar
          </span>
        </div>

        <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="size-5" />
          </div>
          <span className="mt-4 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
            {tersediaCars}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-[#94A3B8]">
            Unit Siap Sewa (Tersedia)
          </span>
        </div>

        <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertCircle className="size-5" />
          </div>
          <span className="mt-4 text-2xl font-extrabold text-amber-600 dark:text-amber-400 sm:text-3xl">
            {disewaCars}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-[#94A3B8]">
            Unit Sedang Disewa
          </span>
        </div>

        <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <Wrench className="size-5" />
          </div>
          <span className="mt-4 text-2xl font-extrabold text-rose-600 dark:text-rose-400 sm:text-3xl">
            {perawatanCars}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-[#94A3B8]">
            Dalam Jadwal Servis
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B0F17]">
        <div className="flex items-center justify-between border-b border-stone-200 pb-5 dark:border-white/10">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Daftar Kendaraan Aktif
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
              Seluruh perubahan harga dan status unit akan langsung tercermin di website utama.
            </p>
          </div>

          <Link
            href="/admin/cars/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1EBE5D] active:scale-95"
          >
            <PlusCircle className="size-4" />
            <span>Tambah Mobil</span>
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-stone-100 dark:bg-white/5">
              <CarIcon className="size-8 text-slate-400" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Belum Ada Unit Mobil di Database
            </h4>
            <p className="mt-1 max-w-sm text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
              Tambahkan mobil pertama Anda dengan mengisi tarif lepas kunci, tarif driver, dan mengunggah foto armada.
            </p>
            <Link
              href="/admin/cars/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B38] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="size-4" />
              <span>Input Unit Pertama Sekarang</span>
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400">
                <tr>
                  <th className="pb-3 pl-2">Mobil</th>
                  <th className="pb-3">Transmisi</th>
                  <th className="pb-3">Lepas Kunci</th>
                  <th className="pb-3">+ Driver</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                {cars.map((car) => {
                  const img = car.images?.[0]?.image_url || "/images/main/car-placeholder.svg"
                  return (
                    <tr key={car.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5">
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-white/5">
                            <Image
                              src={img}
                              alt={car.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {car.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {car.seats} Kursi • {car.fuel_type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-medium">{car.transmission}</td>
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        {car.price_self_drive > 0
                          ? `Rp ${car.price_self_drive.toLocaleString("id-ID")}`
                          : "Khusus Driver"}
                      </td>
                      <td className="py-3.5 font-bold text-[#92400E] dark:text-[#FDE68A]">
                        {car.price_with_driver > 0
                          ? `Rp ${car.price_with_driver.toLocaleString("id-ID")}`
                          : "Hubungi Admin"}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            car.status === "Tersedia"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400"
                              : car.status === "Disewa"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              car.status === "Tersedia"
                                ? "bg-emerald-500"
                                : car.status === "Disewa"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          />
                          {car.status}
                        </span>
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <Link
                          href={`/admin/cars/${car.id}/edit`}
                          className="font-bold text-[#92400E] hover:underline dark:text-[#FDE68A]"
                        >
                          Edit Unit
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
