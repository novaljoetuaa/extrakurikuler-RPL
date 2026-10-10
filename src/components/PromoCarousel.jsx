import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoRpl from '../../assets/rpl.png'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'
import logoAi from '../../assets/ai.png'
import logoGame from '../../assets/game.png'

const promoSlides = [
  {
    id: 1,
    tag: 'PENDAFTARAN ANGGOTA BARU',
    tagIcon: 'fas fa-bullhorn',
    title: 'Pendaftaran Ekstrakurikuler RPL Telah Dibuka!',
    desc: 'Pilih peminatan di Robotik, Desain Grafis, Website & Pemrograman, Artificial Intelligence, atau Game. Kuota terbuka untuk seluruh siswa SMK Krian 1.',
    ctaText: 'Daftar Sekarang',
    ctaLink: '/pendaftaran',
    bidang: 'Umum',
    logo: logoRpl,
    fotoGaleri: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Lihat Persyaratan',
    secondaryLink: '/pendaftaran',
  },
  {
    id: 2,
    tag: 'FOKUS ROBOTIK & IOT',
    tagIcon: 'fas fa-robot',
    title: 'Pelatihan Mikrokontroler & Rakit Line Follower',
    desc: 'Kuasai logika sensor analog, pemrograman mikrokontroler Arduino Uno, hingga pembuatan robot siap tanding.',
    ctaText: 'Pelajari Robotik',
    ctaLink: '/robotic',
    bidang: 'Robotic',
    logo: logoRobotic,
    fotoGaleri: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Baca Artikel Terkait',
    secondaryLink: '/artikel',
  },
  {
    id: 3,
    tag: 'WEBSITE & PEMROGRAMAN',
    tagIcon: 'fas fa-code',
    title: 'Workshop React & Tailwind CSS untuk Pemula',
    desc: 'Bangun portofolio website modern pertamamu dari dasar HTML/CSS hingga proses deployment ke internet.',
    ctaText: 'Eksplorasi Website',
    ctaLink: '/website',
    bidang: 'Website',
    logo: logoWebsite,
    fotoGaleri: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Baca Artikel Terkait',
    secondaryLink: '/artikel',
  },
  {
    id: 4,
    tag: 'DESAIN GRAFIS & UI/UX',
    tagIcon: 'fas fa-palette',
    title: 'Kreativitas Visual, Tipografi & Desain Banner',
    desc: 'Asah kepekaan komposisi visual, hierarki tipografi, dan perancangan identitas digital aplikasi modern.',
    ctaText: 'Eksplorasi Desain',
    ctaLink: '/desain-grafis',
    bidang: 'Desain Grafis',
    logo: logoDesain,
    fotoGaleri: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Lihat Galeri Karya',
    secondaryLink: '/galeri',
  },
  {
    id: 5,
    tag: 'ARTIFICIAL INTELLIGENCE',
    tagIcon: 'fas fa-brain',
    title: 'Belajar Machine Learning & Pengolahan Data',
    desc: 'Kenali dasar logika, olah dataset, dan bangun model kecerdasan buatan sederhana menggunakan Python.',
    ctaText: 'Eksplorasi AI',
    ctaLink: '/artificial-intelligence',
    bidang: 'Artificial Intelligence',
    logo: logoAi,
    fotoGaleri: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Baca Artikel Terkait',
    secondaryLink: '/artikel',
  },
  {
    id: 6,
    tag: 'GAME DEVELOPMENT',
    tagIcon: 'fas fa-gamepad',
    title: 'Rancang & Bangun Game Pertamamu',
    desc: 'Dari konsep gameplay, desain level, hingga publikasi game interaktif menggunakan engine modern.',
    ctaText: 'Eksplorasi Game',
    ctaLink: '/game',
    bidang: 'Game',
    logo: logoGame,
    fotoGaleri: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&h=600&q=80',
    secondaryCta: 'Lihat Galeri Karya',
    secondaryLink: '/galeri',
  },
]

export default function PromoCarousel() {
  const [current, setCurrent] = useState(0)

  // Auto-play interval 5 detik (PRD Section 3.3)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = promoSlides[current]

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-900 text-white shadow-card h-[430px] sm:h-auto sm:min-h-[300px] flex flex-col justify-between">
      {/* Background Images dengan Cross-Fade Murni (ukuran stabil tanpa scale zoom) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {promoSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={s.fotoGaleri}
              alt={s.title}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Lapisan Gradient Overlay Transparan Biru Khas RPL yang stabil */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/35 sm:from-slate-900/80 sm:via-slate-900/55 sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-slate-900/30 pointer-events-none" />
      </div>

      <div className="relative z-30 p-6 sm:p-10 flex flex-col justify-between flex-1">
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="max-w-2xl">
                {/* Badge Promo */}
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-900">
                  <i className={`${slide.tagIcon} text-xs text-slate-900`} />
                  <span>{slide.tag}</span>
                </div>

                {/* Title & Desc dengan min-height terukur agar kartu tidak lompat */}
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl lg:text-4xl leading-tight min-h-[3.75rem] sm:min-h-[4.5rem] flex items-center">
                  {slide.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-white drop-shadow leading-relaxed min-h-[2.5rem] sm:min-h-[2.75rem]">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-white hover:text-slate-900 active:scale-[0.98]"
                  >
                    <span>{slide.ctaText}</span>
                    <i className="fas fa-arrow-right text-xs" />
                  </Link>
                  <Link
                    to={slide.secondaryLink}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-slate-400/20"
                  >
                    <span>{slide.secondaryCta}</span>
                  </Link>
                </div>
              </div>

              {/* Visual Media Box: Gambar Galeri Kegiatan + Logo Bidang (dimensi stabil) */}
              <div className="relative hidden md:flex h-44 w-52 shrink-0 overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-900 shadow-card">
                <img
                  src={slide.fotoGaleri}
                  alt={`Kegiatan ${slide.tag}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                {/* Logo Bidang overlay */}
                <div className="absolute top-2.5 right-2.5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-md">
                  <img
                    src={slide.logo}
                    alt={`Logo ${slide.tag}`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Tag Galeri */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="truncate rounded-md bg-slate-900/80 px-2 py-0.5 border border-slate-200/50 backdrop-blur-sm">
                    <i className="fas fa-camera text-slate-200 mr-1.5" />
                    Galeri {slide.bidang}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators & Controls (mobile: absolute terhadap container agar posisi tetap di setiap slide) */}
        <div className="absolute inset-x-6 bottom-4 z-40 flex items-center justify-between border-t border-slate-200/30 pt-4 sm:static sm:mt-8 sm:inset-auto sm:bottom-auto">
          <div className="flex items-center gap-2">
            {promoSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-8 bg-slate-700' : 'w-2.5 bg-slate-400/50 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-white hover:bg-slate-400/20 transition"
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left text-xs" />
            </button>
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev + 1) % promoSlides.length)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-white hover:bg-slate-400/20 transition"
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
