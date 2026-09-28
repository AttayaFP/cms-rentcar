"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Car } from "@/types/database"
import { updateCarStatusAction, deleteCarAction } from "@/actions/cars"
import { Edit3, Trash2, Search } from "lucide-react"
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

interface CarsTableProps {
  initialCars: Car[]
}

export function CarsTable({ initialCars }: CarsTableProps) {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.transmission.toLowerCase().includes(search.toLowerCase()) ||
      car.fuel_type.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ? true : car.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
    if (!window.confirm(`Hapus unit ${name} dari daftar armada?`)) {
      return
    }
    setIsUpdating(id)
    const res = await deleteCarAction(id)
    if (res.success) {
      setCars((prev) => prev.filter((c) => c.id !== id))
    }
    setIsUpdating(null)
  }

  const filterTabs = [
    { id: "all", label: "Semua Unit", count: cars.length },
    {
      id: "Tersedia",
      label: "Tersedia",
      count: cars.filter((c) => c.status === "Tersedia").length,
    },
    {
      id: "Disewa",
      label: "Disewa",
      count: cars.filter((c) => c.status === "Disewa").length,
    },
    {
      id: "Perawatan",
      label: "Servis",
      count: cars.filter((c) => c.status === "Perawatan").length,
    },
  ]

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/40 p-1 w-fit">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

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
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          disabled={isUpdating === car.id}
                          onClick={() => handleDelete(car.id, car.name)}
                          title="Hapus Mobil"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
