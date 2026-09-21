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

export default function QuickNav({ title = 'Jelajahi Sub-Bidang Lainnya' }) {
  return (
    <div className="pt-6">
      <Reveal className="text-center">
        <p className="eyebrow">Navigasi Cepat</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h3>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {fields.map((f, i) => {
          return (
            <Reveal key={f.to} delay={i * 100}>
              <NavLink
                to={f.to}
                className={({ isActive }) =>
                  `group flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    isActive
                      ? 'border-brand-500 ring-2 ring-brand-400/50'
                      : 'border-slate-200/80 hover:border-brand-300'
                  }`
                }
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 p-4">
                  <img
                    src={f.img}
                    alt={f.label}
                    loading="lazy"
                    className="h-24 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-display text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{f.label}</p>
                    <p className="text-xs text-slate-500">{f.tagline}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <IconArrowRight className="h-4 w-4" />
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

