"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createCarAction, updateCarAction, deleteCarImageAction } from "@/actions/cars"
import { Car, Category, CarImage } from "@/types/database"
import { UploadCloud, CheckCircle2, ArrowLeft, Loader2, Sparkles, AlertCircle, Trash2, X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [existingImages, setExistingImages] = useState<CarImage[]>(car?.images || [])
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState<boolean>(car?.is_featured ?? true)
  const [categoryVal, setCategoryVal] = useState<string>(
    car?.category_id || (categories.length > 0 ? categories[0].id : "")
  )
  const [transmissionVal, setTransmissionVal] = useState<string>(car?.transmission || "Otomatis")
  const [statusVal, setStatusVal] = useState<string>(car?.status || "Tersedia")

  const isEditing = Boolean(car)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
      const urls = filesArray.map((f) => URL.createObjectURL(f))
      setPreviewUrls((prev) => [...prev, ...urls])
    }
  }

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteExistingImage = async (imageId: string, imageUrl: string) => {
    if (!car) return
    setDeletingImageId(imageId)
    const res = await deleteCarImageAction(imageId, imageUrl, car.id)
    if (res.success) {
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
    } else {
      setErrorMessage(res.error || "Gagal menghapus foto")
    }
    setDeletingImageId(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set("category_id", categoryVal)
    formData.set("transmission", transmissionVal)
    formData.set("status", statusVal)
    formData.set("is_featured", isFeatured ? "true" : "false")

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
        <Button variant="ghost" asChild size="sm" className="-ml-2 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/admin/cars" className="flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Daftar Armada</span>
          </Link>
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle className="text-xs font-semibold">Gagal Menyimpan</AlertTitle>
          <AlertDescription className="text-xs mt-1">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold">1. Identitas &amp; Spesifikasi Mobil</CardTitle>
          <CardDescription className="text-xs">
            Informasi umum yang tampil pada kartu katalog mobil di halaman utama.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="name" className="text-xs font-medium">
              Nama Lengkap Unit Mobil <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={car?.name || ""}
              placeholder="Contoh: Toyota Innova Reborn 2.4 G Diesel"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium">
              Kategori Armada
            </Label>
            <Select
              value={categoryVal}
              onValueChange={(val) => setCategoryVal(val as string)}
            >
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="text-xs">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium">
              Transmisi
            </Label>
            <Select
              value={transmissionVal}
              onValueChange={(val) => setTransmissionVal(val as string)}
            >
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder="Pilih Transmisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Otomatis" className="text-xs">Otomatis (Matic)</SelectItem>
                <SelectItem value="Manual" className="text-xs">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fuel_type" className="text-xs font-medium">
              Bahan Bakar
            </Label>
            <Input
              id="fuel_type"
              type="text"
              name="fuel_type"
              defaultValue={car?.fuel_type || "Bensin"}
              placeholder="Contoh: Solar Dex / Bensin"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="seats" className="text-xs font-medium">
                Jumlah Kursi
              </Label>
              <Input
                id="seats"
                type="number"
                name="seats"
                min="1"
                max="25"
                defaultValue={car?.seats || 7}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="luggage" className="text-xs font-medium">
                Koper
              </Label>
              <Input
                id="luggage"
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="price_self_drive" className="text-xs font-medium">
              Tarif Lepas Kunci (Rp / 24 Jam)
            </Label>
            <Input
              id="price_self_drive"
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="price_with_driver" className="text-xs font-medium">
              Tarif + Driver (Rp / Hari) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price_with_driver"
              type="number"
              name="price_with_driver"
              step="50000"
              required
              defaultValue={car?.price_with_driver ?? 0}
              placeholder="Contoh: 650000"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium">
              Status Ketersediaan
            </Label>
            <Select
              value={statusVal}
              onValueChange={(val) => setStatusVal(val as string)}
            >
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tersedia" className="text-xs">Tersedia (Ready booking)</SelectItem>
                <SelectItem value="Disewa" className="text-xs">Sedang Disewa Pelanggan</SelectItem>
                <SelectItem value="Perawatan" className="text-xs">Dalam Servis / Perawatan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2.5 pt-6">
            <Checkbox
              id="is_featured"
              checked={isFeatured}
              onCheckedChange={(checked) => setIsFeatured(Boolean(checked))}
            />
            <Label
              htmlFor="is_featured"
              className="text-xs font-medium cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-muted-foreground" />
              <span>Tampilkan sebagai Unit Unggulan / Favorit</span>
            </Label>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="features" className="text-xs font-medium">
              Fasilitas Utama (Pisahkan dengan koma)
            </Label>
            <Input
              id="features"
              type="text"
              name="features"
              defaultValue={car?.features ? car.features.join(", ") : ""}
              placeholder="Contoh: AC Double Blower, Audio Touchscreen, Kamera Mundur, Captain Seat"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-xs font-medium">
              Deskripsi Singkat Kendaraan
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={car?.description || ""}
              placeholder="Catatan keunggulan unit mobil, kenyamanan rute Bukittinggi / Mandeh..."
              className="resize-none text-xs"
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
          {existingImages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-foreground">
                  Foto Tersimpan Saat Ini
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  {existingImages.length} foto
                </Badge>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {existingImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative size-20 shrink-0 overflow-hidden rounded-md border border-border/80 bg-muted"
                  >
                    <Image
                      src={img.image_url}
                      alt="Foto mobil"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      disabled={deletingImageId === img.id}
                      onClick={() => handleDeleteExistingImage(img.id, img.image_url)}
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/80 text-foreground shadow-xs transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
                      title="Hapus foto ini"
                    >
                      {deletingImageId === img.id ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Trash2 className="size-3" />
                      )}
                    </button>
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
              className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
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
                    className="group relative size-20 shrink-0 overflow-hidden rounded-md border-2 border-primary bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`Preview ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedFile(i)}
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/80 text-foreground shadow-xs transition-colors hover:bg-destructive hover:text-destructive-foreground"
                      title="Batalkan foto ini"
                    >
                      <X className="size-3" />
                    </button>
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
