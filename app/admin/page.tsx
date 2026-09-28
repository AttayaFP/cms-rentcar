import Link from "next/link"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/server"
import { Car as CarIcon, PlusCircle, ArrowUpRight, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import { Car } from "@/types/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Tersedia":
        return (
          <Badge variant="success" className="gap-1.5 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Tersedia</span>
          </Badge>
        )
      case "Disewa":
        return (
          <Badge variant="warning" className="gap-1.5 font-semibold">
            <span className="size-1.5 rounded-full bg-amber-500" />
            <span>Disewa</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="gap-1.5 font-semibold text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground" />
            <span>Perawatan</span>
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Ringkasan Operasional Armada
          </h2>
          <p className="text-xs text-muted-foreground">
            Sistem pemantauan armada, ketersediaan unit, dan tarif resmi Nabil Rental Mobil Padang.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <Button asChild size="sm">
            <Link href="/admin/cars/new" className="flex items-center gap-1.5">
              <PlusCircle className="size-3.5" />
              <span>Tambah Unit</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/cars" className="flex items-center gap-1.5">
              <span>Kelola Semua</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardDescription className="text-xs font-semibold">Total Armada</CardDescription>
            <CarIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
              {totalCars}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Unit terdaftar aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardDescription className="text-xs font-semibold">Unit Tersedia</CardDescription>
            <span className="size-2 rounded-full bg-emerald-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
              {tersediaCars}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              Siap serah terima
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardDescription className="text-xs font-semibold">Sedang Disewa</CardDescription>
            <span className="size-2 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
              {disewaCars}
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
              Aktif beroperasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
            <CardDescription className="text-xs font-semibold">Dalam Servis</CardDescription>
            <span className="size-2 rounded-full bg-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
              {perawatanCars}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Jadwal pemeliharaan
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-border/80">
          <div>
            <CardTitle className="text-base font-bold">Armada Aktif Terbaru</CardTitle>
            <CardDescription className="mt-0.5">
              Daftar unit yang tercatat di database Supabase dan tampil langsung di landing page publik.
            </CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/cars" className="flex items-center gap-1 text-xs">
              <span>Buka Tabel Lengkap</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Kendaraan</TableHead>
                <TableHead>Transmisi / Kapasitas</TableHead>
                <TableHead>Lepas Kunci</TableHead>
                <TableHead>Dengan Supir</TableHead>
                <TableHead>Status Unit</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-28 text-center text-muted-foreground text-xs">
                    Belum ada armada yang diinput. Klik Tambah Unit untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                cars.slice(0, 6).map((car) => {
                  const img = car.images?.[0]?.image_url || "/images/main/car-placeholder.svg"
                  return (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-border/80 bg-muted">
                            <Image
                              src={img}
                              alt={car.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground text-xs truncate">
                              {car.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {car.fuel_type || "Bensin"}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {car.transmission} • {car.seats} Kursi
                      </TableCell>

                      <TableCell className="text-xs font-semibold tabular-nums">
                        {car.price_self_drive > 0
                          ? `Rp ${car.price_self_drive.toLocaleString("id-ID")}`
                          : "Khusus Driver"}
                      </TableCell>

                      <TableCell className="text-xs font-semibold tabular-nums text-foreground">
                        {car.price_with_driver > 0
                          ? `Rp ${car.price_with_driver.toLocaleString("id-ID")}`
                          : "Hubungi Admin"}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(car.status)}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="xs">
                          <Link href={`/admin/cars/${car.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
