import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import TiltedCard from '../components/animations/TiltedCard'
import MagneticButton from '../components/animations/MagneticButton'
import CountingNumber from '../components/animations/CountingNumber'
import SplitText from '../components/animations/SplitText'
import {
  IconRobot,
  IconCode,
  IconPalette,
  IconArrowRight,
  IconRocket,
  IconTrophy,
  IconMegaphone,
} from '../components/icons'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

// Preserve-import helper agar bundler tetap menyertakan aset saat optimasi

const bidangList = [
  {
    to: '/robotic',
    title: 'Robotic',
    tagline: 'Robotika & Mikrokontroler',
    icon: IconRobot,
    logo: logoRobotic,
    desc: 'Merakit dan memprogram robot dari dasar hingga siap bertanding dalam lomba robotika.',
    points: ['Elektronika & Sensor', 'Pemrograman Mikrokontroler', 'Robot Line Follower'],
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },
  {
    to: '/website',
    title: 'Website',
    tagline: 'Pengembangan Web',
    icon: IconCode,
    logo: logoWebsite,
    desc: 'Membangun aplikasi web modern, dari dasar HTML hingga framework React dan Tailwind.',
    points: ['HTML, CSS, JavaScript', 'React & Tailwind CSS', 'Deployment & Hosting'],
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    to: '/desain-grafis',
    title: 'Desain Grafis',
    tagline: 'Desain Visual',
    icon: IconPalette,
    logo: logoDesain,
    desc: 'Mengasah kreativitas visual melalui desain poster, konten, logo, dan identitas digital.',
    points: ['Poster & Media Sosial', 'Logo & Branding', 'Prinsip Desain Modern'],
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  },
]

const stats = [
  { value: '3', suffix: '', label: 'Bidang Keahlian', Icon: IconRocket },
  { value: '50', suffix: '+', label: 'Karya & Proyek', Icon: IconTrophy },
  { value: '10', suffix: '+', label: 'Prestasi & Lomba', Icon: IconTrophy },
]

export default function Home() {
  const { data } = useData()
  const { pengumuman, kegiatan } = data
  const latest = kegiatan.slice(0, 3)

  return (
    <div className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/40 pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/60">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#0f172a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="badge-pill">
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                <span className="font-semibold">Ekstrakurikuler SMK Krian 1</span>
              </div>
            </Reveal>

            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.12]">
              <SplitText text="Rekayasa Perangkat Lunak" />
            </h1>

            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
                Wadah kolaboratif bagi siswa untuk menguasai teknologi masa depan. Kembangkan keahlian dalam{' '}
                <strong className="font-semibold text-slate-800">Robotika</strong>,{' '}
                <strong className="font-semibold text-slate-800">Pengembangan Website</strong>, dan{' '}
                <strong className="font-semibold text-slate-800">Desain Visual</strong> bersama komunitas yang suportif.
              </p>
            </Reveal>

            <Reveal delay={350}>
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <MagneticButton>
                  <Link to="/pendaftaran" className="btn-primary !px-7 !py-3.5 !text-sm">
                    Daftar Sekarang
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/galeri" className="btn-secondary !px-7 !py-3.5 !text-sm">
                    Lihat Dokumentasi
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-6">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Anggota Ekskul RPL"
                      className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Komunitas Belajar Aktif</p>
                  <p className="text-xs text-slate-500">Bergabung dengan puluhan siswa bertalenta</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Hero Visual */}
          <div className="relative lg:col-span-5">
            <Reveal delay={250}>
              <TiltedCard maxTilt={4}>
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2.5 shadow-lift">
                  <div className="relative h-[22rem] sm:h-[26rem] w-full overflow-hidden rounded-[1.5rem]">
                    <img
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
                      alt="Kegiatan Ekstrakurikuler RPL"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 p-3.5 backdrop-blur-md">
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-600">SMK Krian 1 Sidoarjo</p>
                      <p className="text-sm font-bold text-slate-900">Mencetak Generasi Berprestasi di Era Digital</p>
                    </div>
                  </div>
                </div>
              </TiltedCard>

              {/* Floating Stat Badge 1 */}
              <div className="absolute -left-6 top-8 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lift backdrop-blur-md animate-float">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <IconRocket className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">50+ Karya</p>
                  <p className="text-[11px] text-slate-500">Proyek siswa mandiri</p>
                </div>
              </div>

              {/* Floating Stat Badge 2 */}
              <div
                className="absolute -right-4 bottom-10 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lift backdrop-blur-md animate-float"
                style={{ animationDelay: '1.6s' }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <IconTrophy className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">10+ Prestasi</p>
                  <p className="text-[11px] text-slate-500">Juara tingkat kota & daerah</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-soft sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s, i) => {
            const Icon = s.Icon
            return (
              <Reveal key={s.label} delay={i * 100} className="p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  <CountingNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ===== SUB-BIDANG UNGGULAN CARDS ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pilihan Keahlian</p>
          <h2 className="section-title mt-2">Tiga Sub-Bidang Unggulan</h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Temukan bidang yang paling kamu minati. Setiap sub-bidang dibimbing langsung dengan kurikulum terstruktur dan proyek nyata.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {bidangList.map((b, i) => {
            return (
              <Reveal key={b.to} delay={i * 120}>
                <TiltedCard maxTilt={5}>
                  <Link
                    to={b.to}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                  >
                    {/* Visual Card Header */}
                    <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50/40 to-slate-100 p-6">
                      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-200/40 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-sky-200/40 blur-2xl" />
                      <img
                        src={b.logo}
                        alt={`Logo ${b.title}`}
                        loading="lazy"
                        className="h-32 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-3 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {b.tagline}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Materi Pokok:</p>
                        <ul className="mt-2.5 space-y-2">
                          {b.points.map((p) => (
                            <li key={p} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-6">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-800">
                          Pelajari Selengkapnya
                          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltedCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ===== LOGO SHOWCASE STRIP ===== */}
      <section className="border-y border-slate-200/80 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Sub-Bidang Terintegrasi</p>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-1">Logo Resmi Sub-Bidang RPL</h3>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              {[
                { src: logoRobotic, alt: 'Logo Robotic', name: 'Robotic' },
                { src: logoWebsite, alt: 'Logo Website', name: 'Website' },
                { src: logoDesain, alt: 'Logo Desain Grafis', name: 'Desain' },
              ].map((logo, i) => (
                <div key={logo.alt} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2 shadow-subtle ring-1 ring-slate-200 transition hover:scale-105">
                    <img src={logo.src} alt={logo.alt} loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-700">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEGIATAN TERBARU ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Dokumentasi & Aktivitas</p>
            <h2 className="section-title mt-2">Kegiatan Terbaru</h2>
          </div>
          <Link
            to="/galeri"
            className="group inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800"
          >
            <span>Lihat Semua Galeri</span>
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((k, i) => (
            <Reveal key={k.id} delay={i * 120}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={k.gambar}
                    alt={k.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                    {k.bidang}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{k.judul}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{k.deskripsi}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PENGUMUMAN ===== */}
      {pengumuman.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pemberitahuan</p>
            <h2 className="section-title mt-2">Pengumuman Terkini</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pengumuman.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition hover:border-brand-300">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <IconMegaphone className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{p.tanggal}</span>
                    <h3 className="mt-0.5 font-display text-base font-bold text-slate-900">{p.judul}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">{p.isi}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ===== CTA BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 px-6 py-14 text-center text-white shadow-lift sm:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-inner backdrop-blur-md">
                <IconRocket className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Siap Memulai Perjalananmu?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-brand-100 leading-relaxed">
                Bergabunglah dengan Ekstrakurikuler RPL dan perluas wawasan teknologimu. Pendaftaran terbuka bagi seluruh siswa SMK Krian 1.
              </p>
              <div className="mt-8">
                <Link
                  to="/pendaftaran"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-700 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg"
                >
                  Daftar Menjadi Anggota
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
