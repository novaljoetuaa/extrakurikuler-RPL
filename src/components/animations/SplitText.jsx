import { useRef, useEffect, useState } from 'react'

export default function SplitText({ text, className = '', delay = 0, animationFrom = { opacity: 0, transform: 'translateY(60px)' }, animationTo = { opacity: 1, transform: 'translateY(0)' }, threshold = 0.1, stagger = 0.025 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  let globalIndex = 0

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-block whitespace-nowrap"
          style={{ marginRight: '0.28em' }}
        >
          {word.split('').map((char, cIdx) => {
            const idx = globalIndex++
            return (
              <span
                key={cIdx}
                className="inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(60px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + idx * stagger}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + idx * stagger}s`,
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

