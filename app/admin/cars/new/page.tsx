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
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Tambah Armada Baru
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-[#94A3B8] sm:text-sm">
          Masukkan spesifikasi kendaraan, tentukan tarif sewa resmi, dan unggah foto armada.
        </p>
      </div>

      <CarForm categories={categories} />
    </div>
  )
}
