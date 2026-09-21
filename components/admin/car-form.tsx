"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createCarAction, updateCarAction } from "@/actions/cars"
import { Car, Category } from "@/types/database"
import { UploadCloud, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/cars"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span>Kembali ke Daftar Armada</span>
        </Link>
      </div>

      {errorMessage && (
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs font-bold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/50 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B0F17] sm:p-8 flex flex-col gap-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-stone-200 pb-3 dark:border-white/10">
          1. Identitas &amp; Spesifikasi Mobil
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Nama Lengkap Unit Mobil <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={car?.name || ""}
              placeholder="Contoh: Toyota Innova Reborn 2.4 G Diesel"
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Kategori Armada
            </label>
            <select
              name="category_id"
              defaultValue={car?.category_id || ""}
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Transmisi
            </label>
            <select
              name="transmission"
              defaultValue={car?.transmission || "Otomatis"}
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <option value="Otomatis">Otomatis (Matic)</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Bahan Bakar
            </label>
            <input
              type="text"
              name="fuel_type"
              defaultValue={car?.fuel_type || "Bensin"}
              placeholder="Contoh: Solar Dex / Bensin"
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Jumlah Kursi
              </label>
              <input
                type="number"
                name="seats"
                min="1"
                max="25"
                defaultValue={car?.seats || 7}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Koper
              </label>
              <input
                type="number"
                name="luggage"
                min="0"
                max="15"
                defaultValue={car?.luggage || 3}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-stone-200 pb-3 pt-4 dark:border-white/10">
          2. Penetapan Tarif Sewa Resmi
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Tarif Lepas Kunci (Rp / 24 Jam)
            </label>
            <input
              type="number"
              name="price_self_drive"
              step="50000"
              defaultValue={car?.price_self_drive ?? 0}
              placeholder="0 jika khusus dengan supir"
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <span className="text-[10px] text-slate-500">
              Isi 0 jika mobil ini tidak disewakan lepas kunci (misal HiAce).
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Tarif + Driver (Rp / Hari) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="price_with_driver"
              step="50000"
              required
              defaultValue={car?.price_with_driver ?? 0}
              placeholder="Contoh: 650000"
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Status Ketersediaan
            </label>
            <select
              name="status"
              defaultValue={car?.status || "Tersedia"}
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <option value="Tersedia">Tersedia (Ready untuk booking)</option>
              <option value="Disewa">Sedang Disewa Pelanggan</option>
              <option value="Perawatan">Dalam Servis / Perawatan</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              value="true"
              defaultChecked={car?.is_featured ?? true}
              className="size-4 rounded accent-[#C5A059]"
            />
            <label
              htmlFor="is_featured"
              className="text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Tampilkan sebagai Armada Favorit / Unggulan
            </label>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-stone-200 pb-3 pt-4 dark:border-white/10">
          3. Fitur, Fasilitas, &amp; Deskripsi
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Fasilitas Utama (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="features"
              defaultValue={car?.features ? car.features.join(", ") : ""}
              placeholder="Contoh: AC Double Blower, Audio Touchscreen, Kamera Mundur, Captain Seat"
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Deskripsi Singkat Kendaraan
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={car?.description || ""}
              placeholder="Catatan keunggulan unit mobil, kenyamanan rute Bukittinggi / Mandeh..."
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-colors focus:border-[#C5A059] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-stone-200 pb-3 pt-4 dark:border-white/10">
          4. Unggah Foto Mobil (Multi-Gambar)
        </h3>

        <div className="flex flex-col gap-4">
          {car?.images && car.images.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Foto yang Sudah Ada di Sistem ({car.images.length}):
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10"
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

          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 p-8 text-center dark:border-white/20">
            <UploadCloud className="size-8 text-[#C5A059]" />
            <span className="mt-3 text-xs font-bold text-slate-800 dark:text-white">
              Pilih Foto Mobil dari Komputer / HP
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Bisa pilih lebih dari satu foto sekaligus (eksterior, kabin, dashboard)
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 text-xs"
            />
          </div>

          {previewUrls.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Pratinjau Foto Baru yang Akan Diunggah ({previewUrls.length}):
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {previewUrls.map((url, i) => (
                  <div
                    key={i}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border-2 border-[#C5A059]"
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
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-stone-200 pt-6 dark:border-white/10">
          <Link
            href="/admin/cars"
            className="rounded-xl border border-stone-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-stone-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B38] px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:opacity-95 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Menyimpan ke Database...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                <span>{isEditing ? "Simpan Perubahan Unit" : "Terbitkan Mobil Baru"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
