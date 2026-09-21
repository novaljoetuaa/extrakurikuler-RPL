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
} from './icons'
import logo from '../../assets/rpl.png'

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
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/80 bg-slate-900 text-slate-300">
      {/* Accent top line */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Brand Column */}
        <div className="md:col-span-5 lg:col-span-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-md ring-1 ring-white/10">
              <img
                src={logo}
                alt="Logo RPL"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-white">Ekstrakurikuler RPL</p>
              <p className="text-xs text-slate-400">SMK Krian 1 Sidoarjo</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Wadah pengembangan minat, bakat, dan keterampilan siswa dalam bidang Rekayasa Perangkat Lunak.
            Mempelajari Robotika, Pemrograman Web, dan Desain Visual untuk menciptakan generasi digital yang kompeten.
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 lg:col-span-3 md:pl-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
            Navigasi
          </p>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-200 hover:text-white"
                >
                  <IconArrowRight className="h-3.5 w-3.5 text-brand-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-4 lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
            Kontak & Lokasi
          </p>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400 ring-1 ring-white/10">
                <IconMapPin className="h-4 w-4" />
              </span>
              <span className="leading-relaxed text-slate-400">{kontak.alamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400 ring-1 ring-white/10">
                <IconMail className="h-4 w-4" />
              </span>
              <a href={`mailto:${kontak.email}`} className="text-slate-400 transition hover:text-white">
                {kontak.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-400 ring-1 ring-white/10">
                <IconPhone className="h-4 w-4" />
              </span>
              <a href={`tel:${kontak.telepon}`} className="text-slate-400 transition hover:text-white">
                {kontak.telepon}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Ekstrakurikuler RPL — SMK Krian 1 Sidoarjo.</p>
          <p className="text-slate-400">
            Dibuat dengan semangat berkarya oleh anggota RPL
          </p>
        </div>
      </div>
    </footer>
  )
}

