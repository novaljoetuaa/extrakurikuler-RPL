import { useEffect } from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/rpl.png'

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Otomatis transisi ke halaman utama setelah 2.2 detik (PRD Section 3.1: 2-2.5 detik)
    const timer = setTimeout(() => {
      onFinish?.()
    }, 2200)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#E3F2FD] text-[#0D47A1]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Logo RPL dengan Fade In + Scale Up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-[#90CAF9] bg-white p-4 shadow-card sm:h-32 sm:w-32">
          <img src={logo} alt="Logo Ekstrakurikuler RPL" className="h-full w-full object-contain" />
        </div>

        {/* Teks Identitas Ekstrakurikuler RPL */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 font-display text-2xl font-bold tracking-tight text-[#0D47A1] sm:text-3xl"
        >
          EKSTRAKURIKULER RPL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-[#0D47A1]/80 sm:text-sm"
        >
          SMK Krian 1 Sidoarjo
        </motion.p>

        {/* Loading Indicator Warna Solid #2196F3 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-2 text-[#2196F3]"
        >
          <i className="fas fa-circle-notch fa-spin text-xl text-[#2196F3]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
            Memuat Sistem...
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
