import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import {
  IconInstagram,
  IconYoutube,
  IconTiktok,
  IconGithub,
  IconArrowRight,
  IconMapPin,
  IconMail,
  IconPhone,
  IconSparkle,
} from './icons'
import logo from '../../assets/rpl.png'
import bgImage from '../../assets/footer.png'

const sosmedList = [
  { key: 'instagram', Icon: IconInstagram, label: 'Instagram' },
  { key: 'youtube', Icon: IconYoutube, label: 'YouTube' },
  { key: 'tiktok', Icon: IconTiktok, label: 'TikTok' },
  { key: 'github', Icon: IconGithub, label: 'GitHub' },
]

const footerLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/robotic', label: 'Robotic' },
  { to: '/website', label: 'Website' },
  { to: '/desain-grafis', label: 'Desain Grafis' },
  { to: '/galeri', label: 'Galeri Dokumentasi' },
  { to: '/pendaftaran', label: 'Pendaftaran Anggota' },
]

export default function Footer() {
  const { data } = useData()
  const { kontak, sosmed } = data

  return (
    <footer className="relative mt-auto overflow-hidden border-t-2 border-[#90CAF9] bg-[#0D47A1] text-[#E3F2FD]">
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-[#2196F3]" />

      {/* Background dekoratif samar (absolute, tidak memengaruhi layout) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Overlay penjaga kontras teks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0D47A1]/60 via-[#0D47A1]/45 to-[#0A3882]/85"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Brand & Description Column */}
        <div className="md:col-span-5 lg:col-span-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#90CAF9] bg-white p-1.5 shadow-md">
              <img src={logo} alt="Logo RPL" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-[#E3F2FD]">Ekstrakurikuler RPL</p>
              <p className="text-xs font-semibold text-[#90CAF9]">SMK Krian 1 Sidoarjo</p>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#90CAF9]">
            Wadah pengembangan minat, bakat, dan kompetensi terapan siswa dalam bidang Rekayasa Perangkat Lunak. Mempelajari Robotika, Pemrograman Web, dan Desain Grafis untuk membentuk generasi teknologi yang siap berkarya.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {sosmedList.map(({ key, Icon, label }) => {
              const url = sosmed[key]
              if (!url) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#90CAF9] bg-[#E3F2FD]/10 text-[#E3F2FD] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-[#2196F3] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 lg:col-span-3 md:pl-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#90CAF9]">
            Navigasi Halaman
          </p>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm text-[#E3F2FD]/80 transition-all duration-200 hover:text-white hover:translate-x-1"
                >
                  <IconArrowRight className="h-3.5 w-3.5 text-[#90CAF9] opacity-70 transition-all duration-200 group-hover:text-white group-hover:opacity-100" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information Column */}
        <div className="md:col-span-4 lg:col-span-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#90CAF9]">
            Sekolah & Kontak
          </p>
          <ul className="mt-4 space-y-3.5 text-xs sm:text-sm">
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#90CAF9] bg-[#E3F2FD]/15 text-[#90CAF9]">
                <IconMapPin className="h-4 w-4" />
              </span>
              <span className="leading-relaxed text-[#E3F2FD]/85">{kontak.alamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#90CAF9] bg-[#E3F2FD]/15 text-[#90CAF9]">
                <IconMail className="h-4 w-4" />
              </span>
              <a href={`mailto:${kontak.email}`} className="text-[#E3F2FD]/85 transition hover:text-white">
                {kontak.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#90CAF9] bg-[#E3F2FD]/15 text-[#90CAF9]">
                <IconPhone className="h-4 w-4" />
              </span>
              <a href={`tel:${kontak.telepon}`} className="text-[#E3F2FD]/85 transition hover:text-white">
                {kontak.telepon}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-[#90CAF9]/30 bg-[#0A3882]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-[#90CAF9] sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Ekstrakurikuler RPL — SMK Krian 1 Sidoarjo.</p>
          <p className="flex items-center gap-1.5 text-[#E3F2FD]">
            <IconSparkle className="h-3.5 w-3.5 text-[#90CAF9]" />
            <span>Rekayasa Perangkat Lunak</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
