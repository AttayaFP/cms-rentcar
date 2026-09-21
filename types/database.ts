export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Car {
  id: string
  category_id: string | null
  name: string
  slug: string
  transmission: "Manual" | "Otomatis"
  fuel_type: string
  seats: number
  luggage: number
  price_self_drive: number
  price_with_driver: number
  status: "Tersedia" | "Disewa" | "Perawatan"
  is_featured: boolean
  description: string | null
  features: string[]
  created_at: string
  images?: CarImage[]
}

export interface CarImage {
  id: string
  car_id: string
  image_url: string
  is_primary: boolean
  order_index: number
  created_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  created_at: string
}

export interface BusinessSetting {
  key: string
  value: string
  updated_at: string
}

export interface BookingFormPayload {
  carName: string
  serviceType: "Lepas Kunci" | "Dengan Supir"
  startDate: string
  durationDays: number
  pickupLocation: string
  customerNotes?: string
}
