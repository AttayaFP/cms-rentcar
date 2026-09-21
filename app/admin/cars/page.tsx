import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/server"
import { CarsTable } from "@/components/admin/cars-table"
import { PlusCircle } from "lucide-react"
import { Car } from "@/types/database"

export const revalidate = 0

export default async function AdminCarsPage() {
  const supabase = await createAdminClient()

  const { data: carsData } = await supabase
    .from("cars")
    .select("*, images:car_images(*)")
    .order("created_at", { ascending: false })

  const cars: Car[] = carsData || []

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Kelola Armada Mobil
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#94A3B8] sm:text-sm">
            Atur tarif sewa lepas kunci, tarif supir, ubah status ketersediaan, atau tambah unit baru.
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B38] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:opacity-95 active:scale-98"
        >
          <PlusCircle className="size-4" />
          <span>Tambah Mobil Baru</span>
        </Link>
      </div>

      <CarsTable initialCars={cars} />
    </div>
  )
}
