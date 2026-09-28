import { createAdminClient } from "@/lib/supabase/server"
import { CarForm } from "@/components/admin/car-form"
import { Category } from "@/types/database"

export const revalidate = 0

export default async function AdminNewCarPage() {
  const supabase = await createAdminClient()

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true })

  const categories: Category[] = categoriesData || []

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Tambah Armada Baru
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Masukkan spesifikasi kendaraan, tentukan tarif sewa resmi, dan unggah foto armada.
        </p>
      </div>

      <CarForm categories={categories} />
    </div>
  )
}
