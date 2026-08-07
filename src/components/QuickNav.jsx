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
                  `group relative block overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
                    isActive ? 'ring-2 ring-gold-500' : ''
                  }`
                }
              >
                <img
                  src={f.img}
                  alt={f.label}
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
<div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{f.label}</p>
                    <p className="text-xs text-stone-200/90">{f.tagline}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-lg transition-transform duration-500 group-hover:rotate-45">
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

