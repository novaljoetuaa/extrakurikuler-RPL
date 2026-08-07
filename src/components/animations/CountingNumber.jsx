import { useEffect, useRef, useState } from 'react'

export default function CountingNumber({ value, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  const target = parseFloat(String(value).replace(/[^\d.-]/g, '')) || 0
  const isFloat = String(value).includes('.')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setDisplay(target * eased)
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const formatted = isFloat ? display.toFixed(1) : Math.round(display).toLocaleString('id-ID')

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}

