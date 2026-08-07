import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import Aurora from '../components/animations/Aurora'
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
  IconUsers,
  IconSparkle,
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
{ value: '500', suffix: '+', label: 'Anggota Aktif', Icon: IconUsers },
  { value: '50', suffix: '+', label: 'Karya & Proyek', Icon: IconSparkle },
  { value: '10', suffix: '+', label: 'Prestasi Lomba', Icon: IconTrophy },
]

export default function Home() {
  const { data } = useData()
  const { pengumuman, kegiatan } = data
  const latest = kegiatan.slice(0, 3)

  return (
    <div>
{/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-stone-100 text-slate-800">
        <Aurora
          colorStops={['#bcd8f7', '#e3eeef', '#8cbcef']}
          blend="soft"
          style={{ opacity: 0.35 }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3a82d6 1px, transparent 0)', backgroundSize: '34px 34px' }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
          <div>
<Reveal>
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <IconSparkle className="h-3.5 w-3.5" />
                </motion.span>
                Ekstrakurikuler SMK
              </motion.span>
            </Reveal>
<h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-slate-800 sm:text-6xl lg:text-[4.2rem]">
              <SplitText text="Rekayasa Perangkat Lunak" />
            </h1>
            <Reveal delay={250}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
                Wadah bagi siswa untuk mengembangkan keterampilan teknologi digital. Belajar
                merakit robot, membangun website, dan menciptakan desain visual bersama tim
                yang solid dan berpengalaman.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-9 flex flex-wrap gap-4">
                <MagneticButton>
                  <Link to="/pendaftaran" className="btn-primary">
                    Daftar Sekarang
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/galeri" className="btn-secondary">
                    Lihat Galeri
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-stone-200/70 pt-7">
                <div className="flex -space-x-3">
                  {['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Anggota ekskul"
                        className="h-11 w-11 rounded-full border-2 border-white object-cover"
                        loading="lazy"
                      />
                    ))}
                </div>
                <p className="text-sm text-slate-500">
<span className="font-semibold text-slate-800">500+ anggota</span> telah bergabung
                  dalam komunitas kami.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="relative hidden lg:block">
            <TiltedCard maxTilt={5}>
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
                  alt="Kegiatan Ekstrakulikuler RPL"
                  className="h-[30rem] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
              </div>
            </TiltedCard>

            <div className="absolute -left-10 top-10 animate-float rounded-2xl border border-stone-200/70 bg-white/95 p-4 shadow-lift backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <IconRocket className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">50+ Karya</p>
                  <p className="text-xs text-slate-500">Proyek siswa telah dibuat</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-14 animate-float rounded-2xl border border-stone-200/70 bg-white/95 p-4 shadow-lift backdrop-blur" style={{ animationDelay: '1.4s' }}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                  <IconTrophy className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">10+ Prestasi</p>
                  <p className="text-xs text-slate-500">Juara lomba tingkat kota</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="border-b border-stone-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
{stats.map((s, i) => {
            const Icon = s.Icon
            return (
              <Reveal key={s.label} delay={i * 100} className="text-center">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-soft"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <p className="mt-3 font-display text-4xl font-semibold text-ink">
                  <CountingNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-stone-500">{s.label}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

{/* ===== LOGO LOOP (logo bidang) ===== */}
      <section className="border-b border-stone-200/70 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Bidang Kami</p>
            <h2 className="section-title mt-3">Logo Sub-Bidang Unggulan</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 items-center justify-items-center gap-6 sm:gap-10">
            {[
              { src: logoRobotic, alt: 'Logo Robotic' },
              { src: logoWebsite, alt: 'Logo Website' },
              { src: logoDesain, alt: 'Logo Desain Grafis' },
            ].map((logo, i) => (
              <Reveal key={logo.alt} delay={i * 120}>
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-soft ring-1 ring-stone-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:h-28 sm:w-28">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BIDANG ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pilihan Bidang</p>
          <h2 className="section-title mt-3">Tiga Sub-Bidang Unggulan</h2>
          <p className="mt-4 text-stone-500">
            Pilih bidang yang paling sesuai dengan minatmu. Setiap bidang memiliki jadwal latihan
            rutin dan pembimbing yang berpengalaman.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {bidangList.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.to} delay={i * 140}>
                <TiltedCard maxTilt={6}>
                  <Link
                    to={b.to}
                    className="group relative block overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white shadow-soft transition-all duration-500 hover:shadow-lift"
                  >
<div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-100 p-6">
                      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-100/60 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold-100/60 blur-3xl" />
                      <img
                        src={b.logo}
                        alt={`Logo ${b.title}`}
                        loading="lazy"
                        className="h-36 w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute bottom-4 left-5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                        {b.tagline}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold text-ink">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-500">{b.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {b.points.map((p) => (
                          <li key={p} className="flex items-center gap-2.5 text-sm text-stone-600">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors duration-300 group-hover:text-gold-600">
                        Pelajari Lebih Lanjut
                        <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </TiltedCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ===== KEGIATAN ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Aktivitas Kami</p>
              <h2 className="section-title mt-3">Kegiatan Terbaru</h2>
            </div>
            <Link to="/galeri" className="group inline-flex items-center gap-2 text-sm font-bold text-brand-700">
              Lihat Semua Kegiatan
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((k, i) => (
              <Reveal key={k.id} delay={i * 130}>
                <TiltedCard maxTilt={4}>
                  <div className="group overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white shadow-soft transition-all duration-500 hover:shadow-lift">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={k.gambar}
                        alt={k.judul}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-700 backdrop-blur">
                        {k.bidang}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-ink">{k.judul}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-stone-500">{k.deskripsi}</p>
                    </div>
                  </div>
                </TiltedCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PENGUMUMAN ===== */}
      {pengumuman.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pengumuman</p>
            <h2 className="section-title mt-3">Info Terbaru</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {pengumuman.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <div className="group flex gap-5 rounded-3xl border border-stone-200/70 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100 p-3 text-brand-600 shadow-soft">
                    <IconMegaphone className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{p.tanggal}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{p.judul}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{p.isi}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

{/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-gold-100 py-20">
        <Aurora colorStops={['#bcd8f7', '#c9e0e2', '#8cbcef']} blend="soft" style={{ opacity: 0.3 }} />
<Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, 360] }}
            transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 12, repeat: Infinity, ease: 'linear' } }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25"
          >
            <IconRocket className="h-8 w-8" />
          </motion.span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-slate-800 sm:text-5xl">
            Siap Memulai Perjalananmu?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Bergabunglah dengan Ekstrakulikuler RPL dan kembangkan potensi dirimu di dunia teknologi.
          </p>
          <MagneticButton>
            <Link to="/pendaftaran" className="btn-primary mt-8 px-8 py-4 text-base">
              Daftar Menjadi Anggota
              <IconArrowRight className="h-5 w-5" />
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  )
}
