import { BookingFormPayload } from "@/types/database"

export function generateWhatsAppBookingUrl(
  payload: BookingFormPayload,
  targetNumber: string = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6282287140724"
): string {
  const sanitizedNumber = targetNumber.replace(/\D/g, "")
  const messageLines = [
    "Halo Nabil Rental Padang,",
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
  message: string = "Halo Nabil Rental Padang, saya ingin konsultasi sewa mobil di Padang.",
  targetNumber: string = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6282287140724"
): string {
  const sanitizedNumber = targetNumber.replace(/\D/g, "")
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`
}
