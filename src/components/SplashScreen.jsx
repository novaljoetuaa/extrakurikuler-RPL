import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/rpl.png'

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('logo') // 'logo' -> 'text' -> 'done'

  useEffect(() => {
    // Fase 1: tampilkan logo (1.4s)
    const t1 = setTimeout(() => setPhase('text'), 1400)
    // Fase 2: tampilkan teks (1.2s lagi)
    const t2 = setTimeout(() => setPhase('done'), 2600)
    // Fase 3: panggil onFinish agar splash hilang (setelah fade out)
    const t3 = setTimeout(() => onFinish?.(), 3200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-gold-100"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo RPL dengan animasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-stone-200 sm:h-40 sm:w-40"
        >
          <img src={logo} alt="Logo RPL" className="h-full w-full object-contain" />
        </motion.div>

        {/* Cincin dekoratif */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-[2.5rem] border-2 border-dashed border-brand-300/60"
        />
      </motion.div>

      {/* Tulisan "Ekstrakurikuler" muncul setelah logo */}
      <AnimatePresence>
        {phase !== 'logo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-8 text-center"
          >
            <motion.p
              animate={{ letterSpacing: [6, 12, 6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="font-display text-2xl font-bold uppercase text-brand-700 sm:text-3xl"
            >
              Ekstrakurikuler
            </motion.p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold-600">
              Rekayasa Perangkat Lunak
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-brand-400 to-gold-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
