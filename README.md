# Website Ekstrakurikuler RPL — SMK Krian 1 Sidoarjo

Website resmi Ekstrakurikuler Rekayasa Perangkat Lunak (RPL) dengan tiga bidang peminatan: **Robotik**, **Website & Pemrograman**, dan **Desain Grafis**. Website ini digunakan untuk mempublikasikan kegiatan, menerima pendaftaran anggota baru, menampilkan artikel, galeri, serta menyediakan panel admin untuk pengelolaan data.

## Fitur

- **Beranda** — profil ekstrakurikuler, navigasi cepat per bidang, dan pengumuman.
- **Halaman Bidang** — Robotik, Website, dan Desain Grafis dengan kegiatan & jadwal latihan masing-masing.
- **Pendaftaran Online** — wizard 5 langkah (pilih bidang → data diri → upload berkas → konfirmasi → status). Setiap pendaftar mendapat **nomor registrasi unik** berformat `RPL-XXXXXX`.
- **Cek Status** — pendaftar dapat memantau status verifikasi dengan memasukkan **nomor registrasi + nomor WhatsApp** (bukan hanya nomor WA, untuk keamanan data pribadi).
- **Artikel** — publikasi artikel edukasi per bidang, dikelola dari Admin Panel.
- **Galeri** — dokumentasi kegiatan per bidang dengan lightbox.
- **Admin Panel** (`/admin`) — kelola kegiatan, jadwal, pengumuman, artikel, pendaftar (filter bidang + pencarian, ekspor CSV), kontak/sosmed, kartu statistik (jumlah pendaftar, kegiatan, artikel, galeri), dan reset data (harus mengetik `RESET` untuk konfirmasi).
- **Not Found** — halaman 404 bertema website dengan tombol kembali ke beranda.

## Teknologi

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [Tailwind CSS 3](https://tailwindcss.com) — palet tema: `#0D47A1`, `#2196F3`, `#90CAF9`, `#E3F2FD`, `#FFFFFF`
- [Supabase](https://supabase.com) — database (tabel `site_data` & `pendaftar`), Auth (admin), dan Storage (gambar)
- [framer-motion](https://www.framer.com/motion/) untuk animasi, [React Router 6](https://reactrouter.com) untuk routing
- Font Awesome (via CDN di `index.html`)

## Struktur Singkat

```
src/
  components/   Komponen UI (Navbar, Footer, ImageUploader, QuickNav, dll.)
  context/      AuthContext (login admin) & DataContext (state + sinkronisasi Supabase)
  lib/          Klien Supabase
  pages/        Home, Pendaftaran, Artikel, Galeri, AdminPanel, NotFound, dll.
supabase/       setup.sql & rls-pendaftar.sql (skema + kebijakan RLS)
```

## Menjalankan Project

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi ke folder dist/
npm run preview  # pratinjau hasil build
```

## Konfigurasi Environment

Salin `.env.example` menjadi `.env.local` lalu isi:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

## Supabase

1. Jalankan `supabase/setup.sql` sekali di Supabase Dashboard → SQL Editor. Membuat tabel `site_data` (konten situs) dan `pendaftar`, bucket `activity-images`, serta kebijakan RLS.
2. Jalankan `supabase/rls-pendaftar.sql` bila tabel `pendaftar` sudah ada dari versi lama — menghapus policy baca publik dan menambahkan:
   - kolom `nomor_registrasi` (unik, `RPL-XXXXXX`)
   - policy: publik hanya boleh **INSERT**; **SELECT/UPDATE/DELETE** hanya untuk admin
   - fungsi RPC `cek_status_pendaftar(nomor_registrasi, nohp)` untuk cek status yang aman (hanya mengembalikan status, bidang, dan tanggal pendaftaran)
3. Tandai akun admin di **Authentication → Users** dengan app metadata `{"role": "admin"}`.

**Model data:** Supabase adalah sumber data utama; `localStorage` hanya berfungsi sebagai cache/fallback agar website tetap tampil saat offline. Data dari Supabase selalu menggantikan cache saat aplikasi dimuat.

## Admin Panel

Akses `/admin`, login dengan akun Supabase yang ditandai sebagai admin. Dari panel ini admin dapat menambah/mengubah/menghapus kegiatan, jadwal, pengumuman, artikel, dan pendaftar; mengubah status pendaftar; mengelola kontak & sosmed; mengunduh daftar pendaftar sebagai CSV; serta mereset data ke pengaturan awal.

## Deployment

Project ini dapat di-deploy ke [Vercel](https://vercel.com) (`vercel.json` sudah disertakan). Pastikan environment variable `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah diatur di dashboard hosting, lalu build command `npm run build` dengan output `dist`.
