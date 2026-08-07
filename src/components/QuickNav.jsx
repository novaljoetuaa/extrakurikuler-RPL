import { NavLink } from 'react-router-dom'
import { IconRobot, IconCode, IconPalette, IconArrowRight } from './icons'
import Reveal from './Reveal'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

const fields = [
  {
    to: '/robotic',
    label: 'Robotic',
    tagline: 'Robotika & Mikrokontroler',
    icon: IconRobot,
    img: logoRobotic,
  },
  {
    to: '/website',
    label: 'Website',
    tagline: 'Pengembangan Web Modern',
    icon: IconCode,
    img: logoWebsite,
  },
  {
    to: '/desain-grafis',
    label: 'Desain Grafis',
    tagline: 'Kreativitas Visual',
    icon: IconPalette,
    img: logoDesain,
  },
]

export default function QuickNav({ title = 'Jelajahi Bidang Lainnya' }) {
  return (
    <div className="mt-14">
      <Reveal className="text-center">
        <p className="eyebrow">Pindah Halaman</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h3>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {fields.map((f, i) => {
          const Icon = f.icon
          return (
            <Reveal key={f.to} delay={i * 120}>
              <NavLink
                to={f.to}
                className={({ isActive }) =>
                  `group relative block overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
                    isActive ? 'ring-2 ring-gold-500' : ''
                  }`
                }
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-100 p-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-100/70 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-gold-100/70 blur-3xl" />
                  <img
                    src={f.img}
                    alt={f.label}
                    loading="lazy"
                    className="h-28 w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{f.label}</p>
                    <p className="text-xs text-stone-500">{f.tagline}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
                    <IconArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </NavLink>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

