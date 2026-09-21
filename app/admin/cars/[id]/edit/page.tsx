import { notFound } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/server"
import { CarForm } from "@/components/admin/car-form"
import { Car, Category } from "@/types/database"

export const revalidate = 0

interface EditCarPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEditCarPage({ params }: EditCarPageProps) {
  const { id } = await params
  const supabase = await createAdminClient()

  const [carRes, categoriesRes] = await Promise.all([
    supabase
      .from("cars")
      .select("*, images:car_images(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true }),
  ])

  if (!carRes.data) {
    notFound()
  }

  const car: Car = carRes.data
  const categories: Category[] = categoriesRes.data || []

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Edit Armada: {car.name}
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#94A3B8] sm:text-sm">
          Perbarui tarif sewa, status unit, atau tambahkan foto dokumentasi baru.
        </p>
      </div>

      <CarForm car={car} categories={categories} />
    </div>
  )
}
