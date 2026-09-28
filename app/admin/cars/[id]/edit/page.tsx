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
      .order("order_index", { referencedTable: "car_images", ascending: true })
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
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Edit Armada: {car.name}
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Perbarui tarif sewa, status unit, atau kelola foto dokumentasi unit.
        </p>
      </div>

      <CarForm car={car} categories={categories} />
    </div>
  )
}
