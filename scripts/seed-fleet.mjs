const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
}

const newCars = [
  {
    name: "Toyota Avanza Veloz 1.5 Q CVT",
    slug: "toyota-avanza-veloz-15-q-cvt",
    category_id: "c72dc758-cc93-4b29-887d-1b703527b615",
    transmission: "Otomatis",
    fuel_type: "Bensin",
    seats: 7,
    luggage: 2,
    price_self_drive: 350000,
    price_with_driver: 550000,
    status: "Tersedia",
    is_featured: true,
    description: "Pilihan ekonomis nan modern untuk keluarga menjelajahi destinasi wisata dan perkotaan Padang dengan kenyamanan maksimal.",
    features: ["AC Double Blower", "Wireless Charger", "Digital AC Display", "Sensor Parkir & Kamera"],
    images: [
      "/images/cars/avanza-veloz-1.jpg",
      "/images/cars/avanza-veloz-2.jpg"
    ]
  },
  {
    name: "Toyota All New Kijang Innova Zenix 2.0 V CVT",
    slug: "toyota-innova-zenix-20-v-cvt",
    category_id: "c72dc758-cc93-4b29-887d-1b703527b615",
    transmission: "Otomatis",
    fuel_type: "Bensin",
    seats: 7,
    luggage: 3,
    price_self_drive: 600000,
    price_with_driver: 800000,
    status: "Tersedia",
    is_featured: true,
    description: "Platform TNGA modern dengan suspensi lembut dan kabin senyap berkelas eksekutif, pilihan utama tamu VIP dan keluarga.",
    features: ["Panoramic Display", "Captain Seat", "Dual Zone AC", "Electric Parking Brake"],
    images: [
      "/images/cars/innova-zenix-1.jpg",
      "/images/cars/innova-zenix-2.jpg"
    ]
  },
  {
    name: "Toyota Fortuner 2.8 GR Sport 4x2",
    slug: "toyota-fortuner-28-gr-sport",
    category_id: "361f9f87-b945-4a0b-bb0e-b90f0ca993d6",
    transmission: "Otomatis",
    fuel_type: "Solar Dex",
    seats: 7,
    luggage: 3,
    price_self_drive: 850000,
    price_with_driver: 1100000,
    status: "Tersedia",
    is_featured: true,
    description: "SUV gagah dengan torsi melimpah, siap melibas tanjakan Sitinjau Lauik, Kelok 44, maupun rute perbukitan Sumatera Barat dengan mantap.",
    features: ["Power Backdoor Kick Sensor", "Drive Mode Select (Eco/Power)", "Blind Spot Monitor", "Leather GR Interior"],
    images: [
      "/images/cars/fortuner-gr-1.jpg",
      "/images/cars/fortuner-gr-2.jpg"
    ]
  },
  {
    name: "Toyota HiAce Premio Luxury 2.8",
    slug: "toyota-hiace-premio-luxury",
    category_id: "89d3bb75-42bf-49d4-801a-d9d19f142137",
    transmission: "Manual",
    fuel_type: "Solar Dex",
    seats: 12,
    luggage: 5,
    price_self_drive: 0,
    price_with_driver: 1200000,
    status: "Tersedia",
    is_featured: true,
    description: "Minibus kelas luxury dengan kabin high-roof yang lapang, jok captain seat ergonomis, dan suspensi nyaman untuk rombongan tur Minangkabau.",
    features: ["Reclining Luxury Seats", "Port USB Per Bangku", "Kabin High Roof Lapang", "Audio Tour Guide & Mic"],
    images: [
      "/images/cars/hiace-premio-1.jpg",
      "/images/cars/hiace-premio-2.jpg"
    ]
  },
  {
    name: "All New Honda Brio RS 1.2 CVT",
    slug: "honda-brio-rs-12-cvt",
    category_id: "ac6e9ecf-e805-4bd2-9c96-897cba6bad49",
    transmission: "Otomatis",
    fuel_type: "Bensin",
    seats: 5,
    luggage: 2,
    price_self_drive: 300000,
    price_with_driver: 500000,
    status: "Tersedia",
    is_featured: false,
    description: "Hatchback lincah, gesit bermanuver di jalanan kota Padang, hemat bahan bakar, dan sangat nyaman untuk agenda harian maupun kulineran.",
    features: ["Touchscreen Display Audio", "Paddle Shift Sporty", "Keyless Entry & Push Start", "Digital AC"],
    images: [
      "/images/cars/brio-rs-1.jpg",
      "/images/cars/brio-rs-2.jpg"
    ]
  }
]

async function seed() {
  for (const car of newCars) {
    const { images, ...carData } = car

    const checkRes = await fetch(`${supabaseUrl}/rest/v1/cars?slug=eq.${carData.slug}&select=id`, { headers })
    const existing = await checkRes.json()
    if (existing && existing.length > 0) {
      continue
    }

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/cars`, {
      method: "POST",
      headers,
      body: JSON.stringify(carData),
    })

    if (!insertRes.ok) {
      continue
    }

    const insertedCar = (await insertRes.json())[0]

    for (let i = 0; i < images.length; i++) {
      await fetch(`${supabaseUrl}/rest/v1/car_images`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          car_id: insertedCar.id,
          image_url: images[i],
          is_primary: i === 0,
          order_index: i,
        }),
      })
    }
  }
}

seed()
