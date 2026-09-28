import { BookingFormPayload } from "@/types/database"

function sanitizeWhatsAppNumber(num: string): string {
  let cleaned = num.replace(/\D/g, "")
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1)
  }
  return cleaned || "6281276295523"
}

export function generateWhatsAppBookingUrl(
  payload: BookingFormPayload,
  targetNumber: string = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281276295523"
): string {
  const sanitizedNumber = sanitizeWhatsAppNumber(targetNumber)
  const messageLines = [
    "Halo Nabil Rental Mobil Padang,",
    "Saya ingin melakukan reservasi kendaraan:",
    "",
    `• Unit Mobil: ${payload.carName}`,
    `• Pilihan Layanan: ${payload.serviceType}`,
    `• Tanggal Mulai: ${payload.startDate}`,
    `• Estimasi Durasi: ${payload.durationDays} Hari`,
    `• Lokasi Penjemputan: ${payload.pickupLocation}`,
  ]

  if (payload.customerNotes && payload.customerNotes.trim() !== "") {
    messageLines.push(`• Catatan Tambahan: ${payload.customerNotes.trim()}`)
  }

  messageLines.push(
    "",
    "Mohon informasi ketersediaan unit dan konfirmasi pemesanan. Terima kasih."
  )

  const encodedMessage = encodeURIComponent(messageLines.join("\n"))
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`
}

export function generateDirectWhatsAppUrl(
  message: string = "Halo Nabil Rental Mobil Padang, saya ingin konsultasi sewa mobil di Padang.",
  targetNumber: string = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281276295523"
): string {
  const sanitizedNumber = sanitizeWhatsAppNumber(targetNumber)
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`
}
