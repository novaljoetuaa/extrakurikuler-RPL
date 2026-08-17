import { useEffect, useRef } from 'react'

export default function Aurora({ colorStops = ['#3a675a', '#dd9534', '#6a9c8d'], blend = 'soft', style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    let animationId = null
    let w = 0
    let h = 0

    const resize = () => {
      const { offsetWidth, offsetHeight } = canvas
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = offsetWidth
      h = offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rotate = (p, x, y, r) => {
      const cos = Math.cos(r)
      const sin = Math.sin(r)
      return { x: p.x * cos - p.y * sin + x, y: p.x * sin + p.y * cos + y }
    }

    const drawBlob = (x, y, radius, color, time) => {
      const points = 7
      const angleStep = (Math.PI * 2) / points
      ctx.beginPath()
      for (let i = 0; i < points; i++) {
        const baseRadius = radius + Math.sin(time * 0.0006 + i) * radius * 0.12
        const px = x + Math.cos(angleStep * i) * baseRadius
        const py = y + Math.sin(angleStep * i) * baseRadius
        if (i === 0) ctx.moveTo(px, py)
        else {
          const prev = { x: x + Math.cos(angleStep * (i - 1)) * (radius + Math.sin(time * 0.0006 + i - 1) * radius * 0.12), y: y + Math.sin(angleStep * (i - 1)) * (radius + Math.sin(time * 0.0006 + i - 1) * radius * 0.12) }
          const mid = { x: (prev.x + px) / 2, y: (prev.y + py) / 2 }
          ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y)
          ctx.quadraticCurveTo(px, py, (px + (x + Math.cos(angleStep * (i + 1)) * (radius + Math.sin(time * 0.0006 + i + 1) * radius * 0.12))) / 2, (py + (y + Math.sin(angleStep * (i + 1)) * (radius + Math.sin(time * 0.0006 + i + 1) * radius * 0.12))) / 2)
        }
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = blend === 'soft' ? 0.35 : 0.55
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const draw = () => {
      frame++
      const time = frame * 18
      ctx.clearRect(0, 0, w, h)

      // Base wash
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, colorStops[0] + '22')
      grad.addColorStop(0.5, colorStops[1] + '22')
      grad.addColorStop(1, colorStops[2] + '22')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Blobs
      drawBlob(w * 0.22, h * 0.35, Math.min(w, h) * 0.32, colorStops[0], time)
      drawBlob(w * 0.7, h * 0.25, Math.min(w, h) * 0.28, colorStops[1], time * 1.1)
      drawBlob(w * 0.45, h * 0.72, Math.min(w, h) * 0.3, colorStops[2], time * 1.2)
      drawBlob(w * 0.85, h * 0.75, Math.min(w, h) * 0.22, colorStops[1], time * 0.9)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [colorStops, blend])

  return (
    <div
      className="aurora-container pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: style.opacity ?? 0.65 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

