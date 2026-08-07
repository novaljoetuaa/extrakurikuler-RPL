import { useRef, useState } from 'react'

export default function TiltedCard({ children, className = '', maxTilt = 8 }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * maxTilt
    const ry = (px - 0.5) * maxTilt
    setTransform(`perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`)
  }

  const reset = () => setTransform('')

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform, transition: 'transform 0.18s ease-out' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}

