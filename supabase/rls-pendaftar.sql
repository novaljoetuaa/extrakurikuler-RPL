-- ============================================================
-- KEBIJAKAN RLS TABEL `pendaftar` — Ekstrakurikuler RPL
-- ============================================================
-- Jalankan script ini di Supabase SQL Editor SEKALI.
--
-- Tujuan:
--   * Pengunjung biasa (anon/authenticated) BOLEH mengirim
--     pendaftaran (INSERT), tetapi TIDAK BOLEHA membaca
--     seluruh daftar pendaftar (SELECT diblokir).
--   * Admin yang sudah login (role 'admin' pada app_metadata,
--     atau admin default Supabase) boleh SELECT / UPDATE / DELETE.
--
-- Catatan: pastikan admin ditandai dengan app_metadata.role = 'admin'
-- di Supabase Auth (Dashboard -> Authentication -> Users -> metadata).
-- ============================================================

-- 1. Aktifkan RLS (wajib)
alter table public.pendaftar enable row level security;

-- 2. Hapus policy lama yang membocorkan data publik (jika ada)
drop policy if exists "Public read pendaftar" on public.pendaftar;
drop policy if exists "Anyone can read pendaftar" on public.pendaftar;
drop policy if exists "pendaftar_select_all" on public.pendaftar;
drop policy if exists "pendaftar_insert_public" on public.pendaftar;
drop policy if exists "pendaftar_update_public" on public.pendaftar;
drop policy if exists "pendaftar_delete_public" on public.pendaftar;

-- Helper: apakah user saat ini adalah admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- 3. PUBLIC: hanya boleh INSERT pendaftaran baru
create policy "pendaftar_insert_public"
on public.pendaftar
for insert
to anon, authenticated
with check (true);

-- 4. ADMIN: boleh membaca seluruh data pendaftar
create policy "pendaftar_select_admin"
on public.pendaftar
for select
to authenticated
using (public.is_admin());

-- 5. ADMIN: boleh mengubah status / mengelola data pendaftar
create policy "pendaftar_update_admin"
on public.pendaftar
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 6. ADMIN: boleh menghapus data pendaftar
create policy "pendaftar_delete_admin"
on public.pendaftar for delete
to authenticated
using (public.is_admin());

-- 7. Kolom nomor registrasi unik (RPL-XXXXXX)
alter table public.pendaftar add column if not exists nomor_registrasi text;
alter table public.pendaftar add column if not exists "alasanMasuk" text;
alter table public.pendaftar add column if not exists "karyaPortofolio" text;

-- 8. RPC cek status yang aman: wajib nomor registrasi + nomor WhatsApp.
-- Hanya mengembalikan status, bidang, dan tanggal pendaftaran.
create or replace function public.cek_status_pendaftar(
  p_nomor_registrasi text,
  p_nohp text
)
returns table (
  nomor_registrasi text,
  status text,
  bidang text,
  "tanggalDaftar" date
)
language sql stable security definer
set search_path = public
as $$
  select p.nomor_registrasi, p.status, p.bidang, p."tanggalDaftar"
  from public.pendaftar p
  where upper(trim(p.nomor_registrasi)) = upper(trim(p_nomor_registrasi))
    and regexp_replace(coalesce(p.nohp, ''), '\D', '', 'g') = regexp_replace(p_nohp, '\D', '', 'g')
  limit 1;
$$;
