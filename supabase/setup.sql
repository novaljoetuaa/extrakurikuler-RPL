-- Jalankan sekali di Supabase Dashboard > SQL Editor.
-- Data situs dibaca semua pengunjung, tetapi hanya pengguna yang sudah login yang dapat mengubahnya.

create table if not exists public.site_data (
  id integer primary key check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_data enable row level security;

create policy "Public can read site data"
  on public.site_data for select
  using (true);

create policy "Authenticated users can insert site data"
  on public.site_data for insert to authenticated
  with check (true);

create policy "Authenticated users can update site data"
  on public.site_data for update to authenticated
  using (true) with check (true);

create table if not exists public.pendaftar (
  id text primary key,
  nomor_registrasi text unique,
  nama text not null,
  kelas text,
  nohp text,
  email text,
  bidang text not null default 'Robotic',
  alasanMasuk text,
  karyaPortofolio text,
  status text not null default 'Baru',
  tanggalDaftar date not null default current_date,
  created_at timestamptz not null default now()
);

-- Tambahkan kolom baru bila tabel sudah ada dari versi lama
alter table public.pendaftar add column if not exists nomor_registrasi text;
alter table public.pendaftar add column if not exists "alasanMasuk" text;
alter table public.pendaftar add column if not exists "karyaPortofolio" text;

alter table public.pendaftar enable row level security;

-- KEAMANAN: hapus policy publik yang membocorkan daftar pendaftar.
drop policy if exists "Public can read pendaftar" on public.pendaftar;
drop policy if exists "Public read pendaftar" on public.pendaftar;
drop policy if exists "Anyone can read pendaftar" on public.pendaftar;

create policy "pendaftar_insert_public"
  on public.pendaftar for insert
  to anon, authenticated
  with check (true);

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create policy "pendaftar_select_admin"
  on public.pendaftar for select to authenticated
  using (public.is_admin());

create policy "pendaftar_update_admin"
  on public.pendaftar for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "pendaftar_delete_admin"
  on public.pendaftar for delete to authenticated
  using (public.is_admin());

-- Cek status yang aman: pengunjung harus mengirim nomor registrasi DAN
-- nomor WhatsApp. Fungsi security definer membaca tabel atas nama publik,
-- tetapi hanya mengembalikan informasi seperlunya (bukan data pribadi).
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

insert into storage.buckets (id, name, public)
values ('activity-images', 'activity-images', true)
on conflict (id) do update set public = true;

create policy "Public can view activity images"
  on storage.objects for select
  using (bucket_id = 'activity-images');

create policy "Authenticated users can upload activity images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'activity-images');

create policy "Authenticated users can update activity images"
  on storage.objects for update to authenticated
  using (bucket_id = 'activity-images') with check (bucket_id = 'activity-images');

create policy "Authenticated users can delete activity images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'activity-images');
