import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import {
  IconInstagram,
  IconYoutube,
  IconTiktok,
  IconGithub,
  IconArrowRight,
} from './icons'
import logo from '../../assets/rpl.png'

const sosmedList = [
  { key: 'instagram', Icon: IconInstagram, label: 'Instagram' },
  { key: 'youtube', Icon: IconYoutube, label: 'YouTube' },
  { key: 'tiktok', Icon: IconTiktok, label: 'TikTok' },
  { key: 'github', Icon: IconGithub, label: 'GitHub' },
]

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/robotic', label: 'Robotic' },
  { to: '/website', label: 'Website' },
  { to: '/desain-grafis', label: 'Desain Grafis' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/pendaftaran', label: 'Pendaftaran' },
]

export default function Footer() {
  const { data } = useData()
  const { kontak, sosmed } = data

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-brand-100 bg-gradient-to-br from-brand-50 via-white to-sky-50">
      {/* Gold line accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-200 via-brand-400 to-sky-200" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Logo RPL"
              className="h-12 w-12 rounded-2xl object-contain shadow-soft"
            />
            <p className="font-display text-xl font-semibold text-slate-800">Ekstrakulikuler RPL</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Wadah pengembangan bakat siswa di bidang Rekayasa Perangkat Lunak. Robotic, Website,
            dan Desain Grafis — belajar, berkarya, dan berprestasi bersama.
          </p>
          <div className="mt-6 flex gap-2">
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-500 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:shadow-lg hover:shadow-brand-600/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Navigasi */}
        <div className="md:pl-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Navigasi</h4>
          <ul className="mt-5 space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-all duration-300 hover:text-brand-700"
                >
                  <IconArrowRight className="h-3 w-3 text-brand-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Kontak Cepat</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-brand-500">📍</span>
              <span className="text-slate-500">{kontak.alamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-500">✉️</span>
              <a href={`mailto:${kontak.email}`} className="text-slate-500 transition hover:text-brand-700">
                {kontak.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-500">📞</span>
              <a href={`tel:${kontak.telepon}`} className="text-slate-500 transition hover:text-brand-700">
                {kontak.telepon}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Ekstrakulikuler RPL — Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan
            <span className="inline-block text-brand-500 transition-transform hover:scale-125">✦</span>
            oleh anggota RPL
          </p>
        </div>
      </div>
    </footer>
  )
}
