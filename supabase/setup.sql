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
