# PANDUAN PROYEK Web Ekskul RPL

Dokumen ini menjelaskan **letak file** dan **fungsi kode** di dalam proyek ini, agar Anda mudah mengubah sesuatu secara manual.

---

## Daftar Isi
1. [Cara Menjalankan Proyek](#1-cara-menjalankan-proyek)
2. [Struktur Folder](#2-struktur-folder)
3. [Penjelasan File & Fungsinya](#3-penjelasan-file--fungsinya)
4. [Panduan Mengubah Logo Bidang](#4-panduan-mengubah-logo-bidang)
5. [Panduan Mengubah Teks / Konten](#5-panduan-mengubah-teks--konten)
6. [Panduan Mengubah Warna / Tema](#6-panduan-mengubah-warna--tema)

---

## 1. Cara Menjalankan Proyek

Proyek ini dibuat dengan **React + Vite + Tailwind CSS**.

```bash
# 1. Install dependency (cukup sekali, jika belum ada node_modules)
npm install

# 2. Menjalankan server pengembangan (untuk melihat hasil saat coding)
npm run dev
```

- Setelah `npm run dev`, buka `http://localhost:5173` di browser.
- Untuk membuat versi produksi (siap upload ke hosting):
  ```bash
  npm run build
  ```
  Hasil build ada di folder `dist/`.

---

## 2. Struktur Folder

```
EXTRA RPL/
├── index.html                 → Halaman utama HTML (tempat favicon & judul)
├── package.json               → Daftar library & perintah (script)
├── tailwind.config.js         → Konfigurasi warna & font Tailwind
├── postcss.config.js          → Konfigurasi PostCSS (untuk Tailwind)
├── vite.config.js             → Konfigurasi Vite
├── assets/                    → Folder logo (gambar logo)
│   ├── rpl.png                → Logo utama Ekskul RPL
│   ├── logo robotic.jpeg      → Logo bidang Robotic
│   ├── logo website.png       → Logo bidang Website
│   └── logo desain.png        → Logo bidang Desain Grafis
├── public/
│   └── rpl.png                → Salinan logo untuk favicon
├── src/
│   ├── main.jsx               → Titik masuk aplikasi React
│   ├── App.jsx                → Pengaturan rute/halaman (router)
│   ├── index.css              → Gaya global (CSS)
│   ├── components/            → Komponen yang dipakai berulang
│   │   ├── Navbar.jsx         → Navbar / menu atas
│   │   ├── Footer.jsx         → Footer / bagian bawah
│   │   ├── BidangLayout.jsx   → Template halaman bidang (Robotic/Web/Desain)
│   │   ├── QuickNav.jsx       → Navigasi pindah bidang di bawah halaman
│   │   ├── icons.jsx          → Kumpulan ikon SVG
│   │   ├── Reveal.jsx         → Animasi muncul saat scroll
│   │   ├── ImageUploader.jsx  → Komponen upload gambar (dipakai Admin)
│   │   └── animations/        → Berbagai komponen animasi
│   ├── context/
│   │   └── DataContext.jsx    → Penyimpanan data (konten website)
│   └── pages/                 → Halaman-halaman website
│       ├── Home.jsx           → Halaman beranda
│       ├── Robotic.jsx        → Halaman bidang Robotic
│       ├── Website.jsx        → Halaman bidang Website
│       ├── DesainGrafis.jsx   → Halaman bidang Desain Grafis
│       ├── Galeri.jsx         → Halaman galeri kegiatan
│       ├── Pendaftaran.jsx    → Halaman form pendaftaran
│       ├── AdminPanel.jsx     → Panel admin (kelola konten)
│       └── NotFound.jsx       → Halaman 404 (halaman tidak ada)
└── dist/                      → Hasil build (jangan diubah manual)
```

---

## 3. Penjelasan File & Fungsinya

### 3.1 `src/App.jsx` — Pengaturan Rute / Pindah Halaman
File ini menentukan URL tiap halaman.

```jsx
<Route path="/" element={<Home />} />            // halaman utama
<Route path="/robotic" element={<Robotic />} />  // halaman Robotic
<Route path="/website" element={<Website />} />  // halaman Website
<Route path="/desain-grafis" element={<DesainGrafis />} />
<Route path="/galeri" element={<Galeri />} />
<Route path="/pendaftaran" element={<Pendaftaran />} />
<Route path="/admin" element={<AdminPanel />} />
```

> **Cara mengubah**: Untuk menambah halaman, tambahkan file baru di `src/pages/`, lalu tambahkan baris `<Route>` di sini.

### 3.2 `src/context/DataContext.jsx` — Penyimpanan Data Konten
Tempat data seperti kegiatan, jadwal, pengumuman, galeri, kontak, dan sosmed. Ini sumber data yang dipakai semua halaman.

> **Cara mengubah**: Untuk mengubah teks kegiatan/jadwal/pengumuman tanpa pusing, edit data di file ini atau di Panel Admin.

### 3.3 Komponen

| File | Fungsi |
|------|--------|
| `Navbar.jsx` | Menu atas. Berisi logo utama, link menu, dropdown **Bidang**, dan menu mobile. |
| `Footer.jsx` | Bagian bawah. Berisi logo, deskripsi, navigasi, kontak, sosmed. |
| `BidangLayout.jsx` | Template yang dipakai oleh halaman Robotic, Website, Desain Grafis. |
| `QuickNav.jsx` | Tombol "Jelajahi Bidang Lainnya" di bawah halaman bidang. |
| `icons.jsx` | Semua ikon SVG (robot, kode, palet, dll). |

### 3.4 Halaman

| File | Fungsi |
|------|--------|
| `Home.jsx` | Beranda. Ada hero, statistik, kartu bidang, kegiatan, pengumuman. |
| `Robotic.jsx` | Halaman bidang Robotic. Hanya meneruskan deskripsi ke `BidangLayout`. |
| `Website.jsx` | Halaman bidang Website. |
| `DesainGrafis.jsx` | Halaman bidang Desain Grafis. |
| `Galeri.jsx` | Galeri foto kegiatan. |
| `Pendaftaran.jsx` | Form pendaftaran anggota. |
| `AdminPanel.jsx` | Panel admin untuk mengelola konten. |
| `NotFound.jsx` | Halaman saat URL tidak dikenal. |

> **Catatan penting**: Halaman `Robotic.jsx`, `Website.jsx`, dan `DesainGrafis.jsx` **tidak punya tampilan sendiri**. Mereka memanggil komponen `BidangLayout`. Jadi untuk mengubah tampilan ketiga bidang sekaligus, Anda cukup mengubah `BidangLayout.jsx`.

---

## 4. Panduan Mengubah Logo Bidang

Logo bidang dipakai di **4 tempat**. Semua merujuk ke gambar di folder `assets/`.

### Langkah mengganti file logo
1. Ganti/masukkan gambar baru ke folder `assets/` dengan nama yang sama, ATAU
2. Ubah nama file di baris `import` pada file-file berikut.

### Berikut lokasi baris `import` logo di tiap file:

| File | Nama import | Baris yang diubah |
|------|-------------|-------------------|
| `src/pages/Home.jsx` | `logoRobotic`, `logoWebsite`, `logoDesain` | bagian import di atas |
| `src/components/BidangLayout.jsx` | `logoRobotic`, `logoWebsite`, `logoDesain` | bagian import di atas |
| `src/components/QuickNav.jsx` | `logoRobotic`, `logoWebsite`, `logoDesain` | bagian import di atas |
| `src/components/Navbar.jsx` | `logoRobotic`, `logoWebsite`, `logoDesain` | bagian import di atas |

Contoh baris import:
```js
import logoRobotic from '../../assets/logo robotic.jpeg'
```

Jika Anda mengganti nama file gambar, misalnya menjadi `robot-barokah.png`, ubah baris di atas menjadi:
```js
import logoRobotic from '../../assets/robot-barokah.png'
```

> **Penting**: Ganti nama di **semua 4 file** tersebut agar konsisten. Jika hanya diganti di satu file, hanya di tempat itu logonya yang berubah.

---

## 5. Panduan Mengubah Teks / Konten

### 5.1 Teks di halaman Home
Buka `src/pages/Home.jsx`. Di bagian atas file ada konstanta:
- `bidangList` → teks judul, tagline, deskripsi, dan poin tiap bidang.
- `stats` → angka statistik (contoh: "150+ Anggota").

### 5.2 Teks deskripsi tiap bidang
- Robotic → `src/pages/Robotic.jsx` (parameter `deskripsi`)
- Website → `src/pages/Website.jsx`
- Desain Grafis → `src/pages/DesainGrafis.jsx`

### 5.3 Tagline tiap bidang
Buka `src/components/BidangLayout.jsx`, di bagian `bidangMeta`:
```js
const bidangMeta = {
  Robotic: { ..., tagline: 'Robotika & Mikrokontroler', ... },
  Website: { ..., tagline: 'Pengembangan Web Modern', ... },
  'Desain Grafis': { ..., tagline: 'Kreativitas Visual', ... },
}
```
Ubah nilai `tagline` sesuai keinginan.

### 5.4 Kontak & sosmed
Ada di `src/context/DataContext.jsx`.

---

## 6. Panduan Mengubah Warna / Tema

Warna dan font diatur di **`tailwind.config.js`**.

Contoh bagian warna:
```js
colors: {
  brand: { 50: '#eef6ff', 100: '#d9eaff', ... },
  gold: { ... },
  ...
}
```

Warna tersebut dipakai lewat kelas seperti `bg-brand-600`, `text-brand-700`, `bg-gold-100`, dan seterusnya.

> **Cara mengubah**: Ubah nilai hex di `tailwind.config.js`. Misalnya ingin warna utama (brand) jadi hijau, ubah nilai-nilai `brand` ke kode warna hijau yang Anda inginkan.

Beberapa gaya umum juga ada di `src/index.css` (misal kelas `.btn-primary`, `.btn-secondary`, `.section-title`, `.eyebrow`).

---

## Tips Umum
- Jangan mengubah isi folder `dist/` — itu hasil build otomatis.
- Setelah mengubah kode, simpan file. Jika `npm run dev` masih berjalan, perubahan langsung terlihat di browser.
- Jika ingin lihat hasil sesuai produksi, jalankan `npm run build` dan buka file `dist/index.html`.

---

_Semoga membantu! Jika ada bagian yang kurang jelas, file ini bisa ditambah sewaktu-waktu._

---

## 7. Konfigurasi Supabase & Storage (unggah gambar online)

Jika Anda ingin gambar yang diunggah terlihat di perangkat lain dan disimpan secara online, ikuti langkah berikut untuk menyiapkan Supabase dan bucket storage `activity-images`.

Langkah singkat:

1. Buat project di https://app.supabase.com dan catat `URL` serta `anon/public API key`.
2. Tambahkan kedua nilai ini ke berkas environment (di root proyek):

```env
# Vite env (development)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJI...your_anon_key...
```

3. Buat tabel `site_data` (untuk menyimpan data situs) — buka SQL Editor di Supabase dan jalankan:

```sql
create table if not exists site_data (
  id int primary key,
  data jsonb,
  updated_at timestamptz
);

-- Beri satu baris awal jika belum ada
insert into site_data (id, data, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;
```

-- Buat tabel pendaftar (untuk menyimpan data pendaftaran secara online)
```sql
create table if not exists pendaftar (
  id text primary key,
  nama text,
  kelas text,
  nohp text,
  email text,
  bidang text,
  status text,
  tanggaldaftar timestamptz,
  created_at timestamptz default now()
);
```

4. Buat Storage Bucket untuk gambar:
   - Buka menu `Storage` → `Buckets` → `New bucket`.
   - Nama bucket: `activity-images` (harus sama dengan yang dipakai di kode).
   - Privacy: pilih `Public` jika Anda ingin file bisa diakses langsung lewat URL publik. Jika memilih `Private`, Anda perlu men-generate signed URL saat menampilkan gambar.

5. Pengaturan Policy (opsional): jika Anda menggunakan RLS atau kebijakan keamanan, pastikan tabel `site_data` dan bucket storage mengizinkan `anon` atau kunci yang Anda pakai untuk melakukan `upsert` dan `getPublicUrl`, atau gunakan backend/service role untuk sinkronisasi.

6. Restart dev server supaya Vite membaca env baru:

```bash
npm run dev
```

Catatan penting:
- Jika Anda menggunakan `anon` / publishable key di client, pastikan kebijakan Supabase tidak memblokir operasi `upsert` publik pada tabel `site_data` (atau buat API server yang menggunakan service role untuk keamanan lebih baik).
- Jika bucket diset `Public`, `ImageUploader` akan memakai `getPublicUrl(filePath)` sehingga URL akan muncul di `AdminPanel` dan tersimpan ke Supabase lewat `DataContext`.
- Nama bucket harus cocok: `activity-images`.

Jika mau, saya bisa juga menambahkan skrip SQL atau contoh aturan RLS dasar untuk membolehkan `upsert` hanya pada tabel `site_data` jika request berasal dari origin tertentu — beri tahu kalau mau.
