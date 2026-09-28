"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "nabil-rent"

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createCarAction(formData: FormData) {
  try {
    const supabase = await createAdminClient()

    const name = (formData.get("name") as string)?.trim()
    if (!name) {
      return { success: false, error: "Nama mobil wajib diisi" }
    }

    const category_id = (formData.get("category_id") as string) || null
    const transmission = (formData.get("transmission") as "Manual" | "Otomatis") || "Otomatis"
    const fuel_type = (formData.get("fuel_type") as string) || "Bensin"
    const seats = parseInt(formData.get("seats") as string) || 7
    const luggage = parseInt(formData.get("luggage") as string) || 2
    const price_self_drive = parseInt(formData.get("price_self_drive") as string) || 0
    const price_with_driver = parseInt(formData.get("price_with_driver") as string) || 0
    const status = (formData.get("status") as "Tersedia" | "Disewa" | "Perawatan") || "Tersedia"
    const is_featured = formData.get("is_featured") === "true"
    const description = (formData.get("description") as string) || ""
    const featuresRaw = formData.get("features") as string
    const features = featuresRaw ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean) : []

    const baseSlug = generateSlug(name)
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`

    const { data: newCar, error: carError } = await supabase
      .from("cars")
      .insert({
        name,
        slug,
        category_id,
        transmission,
        fuel_type,
        seats,
        luggage,
        price_self_drive,
        price_with_driver,
        status,
        is_featured,
        description,
        features,
      })
      .select()
      .single()

    if (carError || !newCar) {
      return { success: false, error: carError?.message || "Gagal menambahkan mobil" }
    }

    const files = formData.getAll("images") as File[]
    const validFiles = files.filter((f) => f && f.size > 0)

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      const ext = file.name.split(".").pop() || "webp"
      const filePath = `cars/${newCar.id}/${Date.now()}-${i}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          contentType: file.type || (ext === "webp" ? "image/webp" : "image/jpeg"),
          upsert: true,
        })

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath)

        await supabase.from("car_images").insert({
          car_id: newCar.id,
          image_url: publicUrlData.publicUrl,
          is_primary: i === 0,
          order_index: i,
        })
      }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/cars")
    return { success: true, carId: newCar.id }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menambahkan mobil"
    return { success: false, error: msg }
  }
}

export async function updateCarAction(id: string, formData: FormData) {
  try {
    const supabase = await createAdminClient()

    const name = (formData.get("name") as string)?.trim()
    if (!name) {
      return { success: false, error: "Nama mobil tidak boleh kosong" }
    }

    const category_id = (formData.get("category_id") as string) || null
    const transmission = (formData.get("transmission") as "Manual" | "Otomatis") || "Otomatis"
    const fuel_type = (formData.get("fuel_type") as string) || "Bensin"
    const seats = parseInt(formData.get("seats") as string) || 7
    const luggage = parseInt(formData.get("luggage") as string) || 2
    const price_self_drive = parseInt(formData.get("price_self_drive") as string) || 0
    const price_with_driver = parseInt(formData.get("price_with_driver") as string) || 0
    const status = (formData.get("status") as "Tersedia" | "Disewa" | "Perawatan") || "Tersedia"
    const is_featured = formData.get("is_featured") === "true"
    const description = (formData.get("description") as string) || ""
    const featuresRaw = formData.get("features") as string
    const features = featuresRaw ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean) : []

    const { error: updateError } = await supabase
      .from("cars")
      .update({
        name,
        category_id,
        transmission,
        fuel_type,
        seats,
        luggage,
        price_self_drive,
        price_with_driver,
        status,
        is_featured,
        description,
        features,
      })
      .eq("id", id)

    if (updateError) {
      return { success: false, error: updateError.message }
    }

    const files = formData.getAll("images") as File[]
    const validFiles = files.filter((f) => f && f.size > 0)

    if (validFiles.length > 0) {
      const { count } = await supabase
        .from("car_images")
        .select("*", { count: "exact", head: true })
        .eq("car_id", id)

      const startIndex = count || 0

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const ext = file.name.split(".").pop() || "webp"
        const filePath = `cars/${id}/${Date.now()}-${i}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file, {
            contentType: file.type || (ext === "webp" ? "image/webp" : "image/jpeg"),
            upsert: true,
          })

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath)

          await supabase.from("car_images").insert({
            car_id: id,
            image_url: publicUrlData.publicUrl,
            is_primary: startIndex === 0 && i === 0,
            order_index: startIndex + i,
          })
        }
      }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/cars")
    revalidatePath(`/admin/cars/${id}/edit`)
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memperbarui armada"
    return { success: false, error: msg }
  }
}

export async function deleteCarImageAction(imageId: string, imageUrl: string, carId: string) {
  try {
    const supabase = await createAdminClient()

    try {
      const url = new URL(imageUrl)
      const marker = `/${STORAGE_BUCKET}/`
      const index = url.pathname.indexOf(marker)
      if (index !== -1) {
        const storagePath = decodeURIComponent(url.pathname.substring(index + marker.length))
        await supabase.storage.from(STORAGE_BUCKET).remove([storagePath])
      }
    } catch {
    }

    const { error } = await supabase.from("car_images").delete().eq("id", imageId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/cars")
    revalidatePath(`/admin/cars/${carId}/edit`)
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menghapus foto"
    return { success: false, error: msg }
  }
}

export async function deleteCarAction(id: string) {
  try {
    const supabase = await createAdminClient()

    const { data: storageFiles } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(`cars/${id}`)

    if (storageFiles && storageFiles.length > 0) {
      const filePaths = storageFiles.map((f) => `cars/${id}/${f.name}`)
      await supabase.storage.from(STORAGE_BUCKET).remove(filePaths)
    }

    await supabase.from("car_images").delete().eq("car_id", id)
    const { error } = await supabase.from("cars").delete().eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/cars")
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menghapus unit armada"
    return { success: false, error: msg }
  }
}

export async function updateCarStatusAction(
  id: string,
  status: "Tersedia" | "Disewa" | "Perawatan"
) {
  try {
    const supabase = await createAdminClient()

    const { error } = await supabase
      .from("cars")
      .update({ status })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/cars")
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal mengubah status unit"
    return { success: false, error: msg }
  }
}
