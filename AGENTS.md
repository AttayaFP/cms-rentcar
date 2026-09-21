<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Standar Proyek: Nabil Rental Mobil Padang (High-End Enterprise Grade)

## 1. Zero-Comment Code Policy (Aturan Tanpa Komentar)

- Dilarang keras menulis komentar apapun di dalam file codingan (`//`, `/*`, `{/* */}`).
- Tidak boleh ada komentar basa-basi AI, penjelasan fungsi, TODO sementara, atau catatan inline di dalam kode.
- Kode wajib bersih murni dan self-documenting: kejelasan alur dibangun melalui penamaan variabel, fungsi, modul, dan tipe TypeScript yang ekspresif.

## 2. Arsitektur Modular & Partial (Anti-Monolith)

- Dilarang menumpuk kode dalam satu file besar.
- Setiap komponen harus dipecah secara modular dan terisolasi:
  - UI Components: Pisahkan ke dalam unit-unit kecil yang terfokus pada satu tanggung jawab (single responsibility).
  - Business Logic: Pisahkan ke dalam Custom Hooks tersendiri di dalam direktori `hooks/`.
  - Data Types & Interfaces: Pisahkan ke dalam direktori `types/`.
  - Server Actions & Database: Pisahkan ke dalam direktori `actions/` atau `services/`.
  - Helpers & Utility: Pisahkan ke dalam direktori `lib/` atau `utils/`.
  - Halaman (`page.tsx`) hanya bertindak sebagai orkestrator komposisi dari komponen-komponen partial.

## 3. Kebijakan Desain Mobile Anti-Lelah (Horizontal Snap Scroll Per Section)

- Tampilan mobile DILARANG menumpuk kartu berderet panjang ke bawah secara vertikal (bikin lelah scroll ratusan layar).
- Setiap seksi yang memiliki kartu jamak (Armada Mobil, Destinasi Wisata, Syarat Sewa, Ulasan Testimoni) wajib menggunakan layout horizontal swipe:
  - Mobile: `flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none` dengan lebar kartu nyaman di jempol (`w-[82vw]` s/d `w-[85vw]` dan batas maksimal 340px) sehingga setiap seksi hanya memakan 1 tinggi layar.
  - Desktop: Grid responsif (`sm:grid sm:grid-cols-2 lg:grid-cols-3` atau `lg:grid-cols-4`).
  - Animasi transisi halus menggunakan Framer Motion (`motion/react`) atau GSAP.

## 4. Dilarang Hardcode Harga & Informasi Asumsi (Wajib via Admin CMS)

- Seluruh penetapan tarif sewa (Lepas Kunci, Dengan Supir), status unit armada (Tersedia, Disewa, Servis), dan spesifikasi kendaraan WAJIB dikelola dinamis melalui database Supabase dan panel admin di rute `/admin`.
- Jika tarif belum diset atau bernilai 0/null di database, sistem wajib menampilkan "Hubungi Admin" atau "Khusus Driver", dilarang keras mengarang atau menembak harga tebakan di frontend.

## 5. Informasi Resmi Bisnis Nabil Rental Mobil Padang

- Nama Resmi Bisnis: Nabil Rental Mobil Padang
- Nomor WhatsApp Resmi: 0822-8714-0724 (format internasional: `6282287140724`)
- Alamat Kantor Resmi: Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat
- Koordinat Lokasi Google Maps: `-0.8830518, 100.3591148` (Sewa Toyota HiAce Padang | Rental Mobil Padang.N_Rentcarpadang)

## 6. Status Terkini Fitur & Modul Sistem

### A. Landing Page Publik (`/`)
- Hero Canvas Scrubber: Rendering WebP 60 FPS sinkron dengan smooth scroll Lenis (`h-[220vh]` mobile, `h-dvh`).
- Keunggulan (`#keunggulan`): Layanan 24 Jam, mobil wangi, supir lokal berpengalaman, serah terima Bandara BIM.
- Katalog Armada (`#armada`):
  - Dukungan multi-foto per mobil dengan swipe gesture di mobile, panah prev/next, dot indicators, dan badge hitungan foto.
  - Modal Lightbox layar penuh dengan thumbnail bar dan tombol WhatsApp booking.
  - Mobile horizontal snap-scroll anti-fatigue.
- Panduan Wisata Minangkabau (`#wisata`): Jam Gadang (`object-[center_top]`), Teluk Mandeh (orientasi pemandangan pulau laut toska), Harau Kelok 9, dan BIM (atap gonjong).
- Syarat & Ketentuan Sewa (`#syarat`): Tab interaktif Lepas Kunci vs +Driver serta 3 langkah mudah sewa (horizontal snap scroll mobile).
- Ulasan Pelanggan (`#testimoni`): Testimoni verified bintang 5 instansi kedinasan, keluarga, dan pebisnis.
- Tanya Jawab (`#faq`): Accordion 6 pertanyaan top SEO Padang dilengkapi schema JSON-LD `FAQPage`.
- Lokasi Kantor & Kontak (`#lokasi`): Iframe Google Maps resmi dan alamat lengkap Tunggul Hitam.
- Sticky Action Mobile: Bottom bar WhatsApp dan telpon langsung cepat.

### B. Panel Manajemen Admin CMS (`/admin`)
- Layout Admin (`/admin`): Sidebar navigasi desktop dan top bar ringkas mobile.
- Dashboard (`/admin`): Kartu statistik metrik armada (Total, Tersedia, Disewa, Servis) dan tabel armada terkini.
- Kelola Armada (`/admin/cars`): Tabel lengkap pencarian armada, tombol cepat ganti status real-time, edit unit, dan hapus unit.
- Tambah Mobil Baru (`/admin/cars/new`): Form input identitas, kategori Supabase, transmisi, tarif lepas kunci & supir, fasilitas, deskripsi, serta multi-file image uploader ke bucket Supabase `nabil-rent`.
- Edit Mobil (`/admin/cars/[id]/edit`): Form pembaruan data mobil dan penambahan foto dokumentasi baru.
- Server Actions (`actions/cars.ts`): Operasi CRUD aman menggunakan `createAdminClient` (service role).

### C. Basis Data Armada Supabase Terkini (6 Unit Live & Representatif)
1. Toyota Innova Reborn 2.4 G Diesel (Family MPV, Otomatis, Solar Dex, 7 Seater, Rp 450rb / Rp 650rb)
2. Toyota Avanza Veloz 1.5 Q CVT (Family MPV, Otomatis, Bensin, 7 Seater, Rp 350rb / Rp 550rb)
3. Toyota All New Kijang Innova Zenix 2.0 V CVT (Family MPV, Otomatis, Bensin, 7 Seater, Rp 600rb / Rp 800rb)
4. Toyota Fortuner 2.8 GR Sport 4x2 (Executive SUV, Otomatis, Solar Dex, 7 Seater, Rp 850rb / Rp 1.1jt)
5. Toyota HiAce Premio Luxury 2.8 (Minibus Wisata, Manual, Solar Dex, 12 Seater, Khusus Driver: Rp 1.2jt)
6. All New Honda Brio RS 1.2 CVT (City Car, Otomatis, Bensin, 5 Seater, Rp 300rb / Rp 500rb)
Semua unit di atas telah dilengkapi 2 foto resolusi tinggi (eksterior & interior kabin), badges fasilitas, dan terhubung ke dynamic WhatsApp CTA.

## 7. Rencana Tugas Sesi Selanjutnya (Roadmap Besok)

1. Autentikasi Pengelola Admin:
   - Membuat halaman login admin (`/admin/login`) terintegrasi dengan Supabase Auth atau Session aman agar rute `/admin` terlindungi middleware Next.js.
   - Redirect otomatis dari `/admin/*` ke `/admin/login` jika belum terautentikasi.
2. Pengaturan Kontak & Bisnis Dinamis (`/admin/settings`):
   - Modul pengaturan nomor WhatsApp, rekening pembayaran, dan alamat kantor langsung dari panel admin tanpa ubah kodingan.
3. Input Armada Real & Manajemen Gambar Supabase Storage:
   - Pengelola memasukkan foto asli unit operasional dan tarif resmi melalui form `/admin/cars/new` atau `/admin/cars/[id]/edit`.
4. Optimasi SEO & Produksi:
   - Metadata dinamis, `sitemap.xml`, `robots.txt`, dan verifikasi build sebelum deployment ke Vercel.

