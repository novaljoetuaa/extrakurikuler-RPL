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
  nama text not null,
  kelas text,
  nohp text,
  email text,
  bidang text not null default 'Robotic',
  status text not null default 'Baru',
  tanggalDaftar date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.pendaftar enable row level security;

create policy "Public can read pendaftar"
  on public.pendaftar for select
  using (true);

create policy "Public can insert pendaftar"
  on public.pendaftar for insert
  with check (true);

create policy "Authenticated users can update pendaftar"
  on public.pendaftar for update to authenticated
  using (true) with check (true);

create policy "Authenticated users can delete pendaftar"
  on public.pendaftar for delete to authenticated
  using (true);

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
