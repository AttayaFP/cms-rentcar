"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Car } from "@/types/database"
import { updateCarStatusAction, deleteCarAction } from "@/actions/cars"
import { Edit3, Trash2, Search, MoreHorizontal, ExternalLink, Loader2, AlertTriangle } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CarsTableProps {
  initialCars: Car[]
}

export function CarsTable({ initialCars }: CarsTableProps) {
  const router = useRouter()
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [tableError, setTableError] = useState<string | null>(null)

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      (car.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (car.transmission || "").toLowerCase().includes(search.toLowerCase()) ||
      (car.fuel_type || "").toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ? true : car.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (
    id: string,
    newStatus: "Tersedia" | "Disewa" | "Perawatan"
  ) => {
    setIsUpdating(id)
    setTableError(null)
    const res = await updateCarStatusAction(id, newStatus)
    if (res.success) {
      setCars((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      )
    } else {
      setTableError(res.error || "Gagal mengubah status unit")
    }
    setIsUpdating(null)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    setTableError(null)
    const res = await deleteCarAction(deleteTarget.id)
    if (res.success) {
      setCars((prev) => prev.filter((c) => c.id !== deleteTarget.id))
      setDeleteTarget(null)
    } else {
      setTableError(res.error || "Gagal menghapus unit armada")
    }
    setIsDeleting(false)
  }

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

  const totalCount = cars.length
  const availableCount = cars.filter((c) => c.status === "Tersedia").length
  const rentedCount = cars.filter((c) => c.status === "Disewa").length
  const maintenanceCount = cars.filter((c) => c.status === "Perawatan").length

  return (
    <div className="flex flex-col gap-4">
      {tableError && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle className="text-xs font-semibold">Terjadi Kesalahan</AlertTitle>
          <AlertDescription className="text-xs mt-0.5">
            {tableError}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val as string)}
        >
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5 text-xs">
              <span>Semua Unit</span>
              <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px]">
                {totalCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="Tersedia" className="gap-1.5 text-xs">
              <span>Tersedia</span>
              <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px]">
                {availableCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="Disewa" className="gap-1.5 text-xs">
              <span>Disewa</span>
              <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px]">
                {rentedCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="Perawatan" className="gap-1.5 text-xs">
              <span>Servis</span>
              <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px]">
                {maintenanceCount}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari armada, transmisi..."
            className="pl-8 text-xs"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Kendaraan</TableHead>
              <TableHead>Spesifikasi</TableHead>
              <TableHead>Lepas Kunci</TableHead>
              <TableHead>Dengan Supir</TableHead>
              <TableHead>Status Operasional</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground text-xs">
                  Tidak ada armada yang sesuai dengan kriteria filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredCars.map((car) => {
                const img = car.images?.[0]?.image_url || "/images/main/car-placeholder.svg"
                return (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-muted">
                          <Image
                            src={img}
                            alt={car.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground text-sm truncate">
                            {car.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {car.images?.length || 1} Foto Terdaftar
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-xs font-medium text-foreground">
                        {car.transmission}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {car.seats} Kursi • {car.fuel_type || "Bensin"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-semibold tabular-nums text-foreground">
                        {car.price_self_drive > 0
                          ? `Rp ${car.price_self_drive.toLocaleString("id-ID")}`
                          : "Khusus Driver"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-semibold tabular-nums text-foreground">
                        {car.price_with_driver > 0
                          ? `Rp ${car.price_with_driver.toLocaleString("id-ID")}`
                          : "Hubungi Admin"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(car.status)}
                        <select
                          disabled={isUpdating === car.id}
                          value={car.status}
                          aria-label={`Ubah status ${car.name}`}
                          onChange={(e) =>
                            handleStatusChange(
                              car.id,
                              e.target.value as "Tersedia" | "Disewa" | "Perawatan"
                            )
                          }
                          className="h-7 rounded-md border border-border bg-background px-2 text-[11px] font-medium text-foreground outline-none transition-colors hover:bg-muted/50 focus:border-ring focus:ring-1 focus:ring-ring"
                        >
                          <option value="Tersedia">Tersedia</option>
                          <option value="Disewa">Disewa</option>
                          <option value="Perawatan">Perawatan</option>
                        </select>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button asChild variant="outline" size="icon-sm">
                          <Link href={`/admin/cars/${car.id}/edit`} title="Edit Data Mobil">
                            <Edit3 className="size-3.5" />
                          </Link>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex size-7 items-center justify-center rounded-lg border border-transparent hover:bg-muted text-muted-foreground hover:text-foreground outline-none">
                            <MoreHorizontal className="size-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onClick={() => router.push(`/admin/cars/${car.id}/edit`)}
                              className="flex items-center gap-2 text-xs cursor-pointer"
                            >
                              <Edit3 className="size-3.5" />
                              <span>Edit Detail Unit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => window.open("/#armada", "_blank")}
                              className="flex items-center gap-2 text-xs cursor-pointer"
                            >
                              <ExternalLink className="size-3.5" />
                              <span>Lihat di Katalog Web</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteTarget({ id: car.id, name: car.name })}
                              className="flex items-center gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="size-3.5" />
                              <span>Hapus Armada</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle className="text-base font-bold">Hapus Unit Armada?</DialogTitle>
            <DialogDescription className="text-xs">
              Apakah Anda yakin ingin menghapus <strong>{deleteTarget?.name}</strong> dari sistem? Tindakan ini permanen dan akan menghapus unit dari katalog publik.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setDeleteTarget(null)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Menghapus...</span>
                </>
              ) : (
                "Hapus Sekarang"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
