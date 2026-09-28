"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createCarAction, updateCarAction } from "@/actions/cars"
import { Car, Category } from "@/types/database"
import { UploadCloud, CheckCircle2, ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CarFormProps {
  car?: Car
  categories: Category[]
}

export function CarForm({ car, categories }: CarFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const isEditing = Boolean(car)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(filesArray)
      const urls = filesArray.map((f) => URL.createObjectURL(f))
      setPreviewUrls(urls)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    selectedFiles.forEach((file) => {
      formData.append("images", file)
    })

    try {
      if (isEditing && car) {
        const res = await updateCarAction(car.id, formData)
        if (!res.success) {
          setErrorMessage(res.error || "Gagal memperbarui data mobil")
          setIsSubmitting(false)
          return
        }
      } else {
        const res = await createCarAction(formData)
        if (!res.success) {
          setErrorMessage(res.error || "Gagal menambahkan mobil baru")
          setIsSubmitting(false)
          return
        }
      }

      router.push("/admin/cars")
      router.refresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan sistem"
      setErrorMessage(msg)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/cars"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Daftar Armada</span>
        </Link>
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
          {errorMessage}
        </div>
      )}

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold">1. Identitas &amp; Spesifikasi Mobil</CardTitle>
          <CardDescription className="text-xs">
            Informasi umum yang tampil pada kartu katalog mobil di halaman utama.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-foreground">
              Nama Lengkap Unit Mobil <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="name"
              required
              defaultValue={car?.name || ""}
              placeholder="Contoh: Toyota Innova Reborn 2.4 G Diesel"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Kategori Armada
            </label>
            <select
              name="category_id"
              defaultValue={car?.category_id || ""}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              <option value="" className="bg-popover text-popover-foreground">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-popover text-popover-foreground">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Transmisi
            </label>
            <select
              name="transmission"
              defaultValue={car?.transmission || "Otomatis"}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              <option value="Otomatis" className="bg-popover text-popover-foreground">Otomatis (Matic)</option>
              <option value="Manual" className="bg-popover text-popover-foreground">Manual</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Bahan Bakar
            </label>
            <Input
              type="text"
              name="fuel_type"
              defaultValue={car?.fuel_type || "Bensin"}
              placeholder="Contoh: Solar Dex / Bensin"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                Jumlah Kursi
              </label>
              <Input
                type="number"
                name="seats"
                min="1"
                max="25"
                defaultValue={car?.seats || 7}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                Koper
              </label>
              <Input
                type="number"
                name="luggage"
                min="0"
                max="15"
                defaultValue={car?.luggage || 3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold">2. Tarif Sewa Resmi &amp; Status</CardTitle>
          <CardDescription className="text-xs">
            Penetapan harga harian dan ketersediaan operasional unit saat ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Tarif Lepas Kunci (Rp / 24 Jam)
            </label>
            <Input
              type="number"
              name="price_self_drive"
              step="50000"
              defaultValue={car?.price_self_drive ?? 0}
              placeholder="0 jika khusus dengan supir"
            />
            <span className="text-[11px] text-muted-foreground">
              Ketik 0 bila tidak menerima sewa lepas kunci (misal HiAce Luxury).
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Tarif + Driver (Rp / Hari) <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              name="price_with_driver"
              step="50000"
              required
              defaultValue={car?.price_with_driver ?? 0}
              placeholder="Contoh: 650000"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Status Ketersediaan
            </label>
            <select
              name="status"
              defaultValue={car?.status || "Tersedia"}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              <option value="Tersedia" className="bg-popover text-popover-foreground">Tersedia (Ready booking)</option>
              <option value="Disewa" className="bg-popover text-popover-foreground">Sedang Disewa Pelanggan</option>
              <option value="Perawatan" className="bg-popover text-popover-foreground">Dalam Servis / Perawatan</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              value="true"
              defaultChecked={car?.is_featured ?? true}
              className="size-4 rounded border-input text-primary focus:ring-ring"
            />
            <label
              htmlFor="is_featured"
              className="text-xs font-medium text-foreground flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="size-3.5 text-muted-foreground" />
              <span>Tampilkan sebagai Unit Unggulan / Favorit</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold">3. Fitur, Fasilitas &amp; Keterangan</CardTitle>
          <CardDescription className="text-xs">
            Fasilitas kabin dan kenyamanan untuk menarik minat calon penyewa.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Fasilitas Utama (Pisahkan dengan koma)
            </label>
            <Input
              type="text"
              name="features"
              defaultValue={car?.features ? car.features.join(", ") : ""}
              placeholder="Contoh: AC Double Blower, Audio Touchscreen, Kamera Mundur, Captain Seat"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Deskripsi Singkat Kendaraan
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={car?.description || ""}
              placeholder="Catatan keunggulan unit mobil, kenyamanan rute Bukittinggi / Mandeh..."
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold">4. Dokumentasi &amp; Foto Unit</CardTitle>
          <CardDescription className="text-xs">
            Unggah foto eksterior, kabin depan, dan baris penumpang dalam format WebP/JPG/PNG.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex flex-col gap-4">
          {car?.images && car.images.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-foreground">
                  Foto Tersimpan Saat Ini
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  {car.images.length} foto
                </Badge>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {car.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative size-20 shrink-0 overflow-hidden rounded-md border border-border/80 bg-muted"
                  >
                    <Image
                      src={img.image_url}
                      alt="Foto mobil"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/90 p-8 text-center bg-muted/20">
            <UploadCloud className="size-7 text-muted-foreground" />
            <span className="mt-2.5 text-xs font-semibold text-foreground">
              Pilih Foto Mobil dari Komputer / HP
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Bisa pilih lebih dari satu file secara bersamaan (Multi-Image)
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:opacity-90"
            />
          </div>

          {previewUrls.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-foreground">
                  Foto Baru yang Akan Diunggah
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {previewUrls.length} file dipilih
                </Badge>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {previewUrls.map((url, i) => (
                  <div
                    key={i}
                    className="relative size-20 shrink-0 overflow-hidden rounded-md border-2 border-primary bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`Preview ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="outline" asChild size="sm">
          <Link href="/admin/cars">
            Batal
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className="min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="size-3.5" />
              <span>{isEditing ? "Simpan Perubahan" : "Terbitkan Mobil"}</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
