import { NavLink } from 'react-router-dom'
import { IconRobot, IconCode, IconPalette, IconBrain, IconGamepad, IconArrowRight, IconSparkle } from './icons'
import Reveal from './Reveal'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'
import logoAi from '../../assets/ai.png'
import logoGame from '../../assets/game.png'

const fields = [
  {
    to: '/robotic',
    label: 'Robotic',
    tagline: 'Robotika & Mikrokontroler',
    badge: 'Hardware & IoT',
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    icon: IconRobot,
    img: logoRobotic,
  },
  {
    to: '/website',
    label: 'Website',
    tagline: 'Pengembangan Web Modern',
    badge: 'Fullstack Web',
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    icon: IconCode,
    img: logoWebsite,
  },
  {
    to: '/desain-grafis',
    label: 'Desain Grafis',
    tagline: 'UI/UX & Desain Visual',
    badge: 'Visual & Branding',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    icon: IconPalette,
    img: logoDesain,
  },
  {
    to: '/artificial-intelligence',
    label: 'Artificial Intelligence',
    tagline: 'Machine Learning & Data Cerdas',
    badge: 'AI & Data Science',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: IconBrain,
    img: logoAi,
  },
  {
    to: '/game',
    label: 'Game',
    tagline: 'Game Design & Development',
    badge: 'Game & Interaktif',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: IconGamepad,
    img: logoGame,
  },
]

export default function QuickNav({ title = 'Jelajahi Sub-Bidang Lainnya' }) {
  return (
    <div className="pt-4">
      <Reveal className="text-center">
        <p className="eyebrow">
          <IconSparkle className="h-3.5 w-3.5" />
          Navigasi Cepat
        </p>
        <h3 className="section-title mt-1.5 !text-2xl sm:!text-3xl">{title}</h3>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f, i) => {
          return (
            <Reveal key={f.to} delay={i * 100}>
              <NavLink
                to={f.to}
                className={({ isActive }) =>
                  `group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    isActive
                      ? 'border-slate-600 ring-2 ring-slate-400/40 shadow-glow'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`
                }
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                  <img
                    src={f.img}
                    alt={f.label}
                    loading="lazy"
                    className="h-24 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute top-3 right-3 rounded-md border px-2 py-0.5 text-[9px] font-bold ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {f.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.tagline}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-slate-800 group-hover:text-white">
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
