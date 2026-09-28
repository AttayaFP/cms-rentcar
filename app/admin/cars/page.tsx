import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/server"
import { CarsTable } from "@/components/admin/cars-table"
import { PlusCircle } from "lucide-react"
import { Car } from "@/types/database"
import { Button } from "@/components/ui/button"

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
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Kelola Armada Mobil
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Atur tarif sewa lepas kunci, tarif supir, ubah status ketersediaan, atau tambah unit baru.
          </p>
        </div>

        <Button asChild size="sm">
          <Link href="/admin/cars/new" className="flex items-center gap-1.5">
            <PlusCircle className="size-3.5" />
            <span>Tambah Mobil Baru</span>
          </Link>
        </Button>
      </div>

      <CarsTable initialCars={cars} />
    </div>
  )
}
