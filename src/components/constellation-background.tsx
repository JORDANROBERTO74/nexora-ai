'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let animationId = 0
    let points: Point[] = []

    const createPoints = () => {
      const count = Math.min(86, Math.max(46, Math.floor(width / 24)))
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.2,
        size: index % 7 === 0 ? 2.2 : 1.25 + Math.random() * 1.2,
        hue: index % 5 === 0 ? 356 : 206
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      createPoints()
    }

    const draw = () => {
      frame += 1
      context.clearRect(0, 0, width, height)

      const base = context.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, 'rgba(7, 24, 46, 0.98)')
      base.addColorStop(0.45, 'rgba(0, 55, 102, 0.76)')
      base.addColorStop(1, 'rgba(6, 17, 32, 0.98)')
      context.fillStyle = base
      context.fillRect(0, 0, width, height)

      const warmth = context.createLinearGradient(0, height * 0.12, width, height)
      warmth.addColorStop(0, 'rgba(0, 113, 188, 0.22)')
      warmth.addColorStop(0.38, 'rgba(255, 255, 255, 0.08)')
      warmth.addColorStop(0.8, 'rgba(227, 6, 19, 0.16)')
      warmth.addColorStop(1, 'rgba(255, 255, 255, 0)')
      context.fillStyle = warmth
      context.fillRect(0, 0, width, height)

      points.forEach(point => {
        point.x += point.vx + Math.sin((frame + point.y) * 0.002) * 0.05
        point.y += point.vy + Math.cos((frame + point.x) * 0.002) * 0.04

        if (point.x < -20) point.x = width + 20
        if (point.x > width + 20) point.x = -20
        if (point.y < -20) point.y = height + 20
        if (point.y > height + 20) point.y = -20
      })

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const first = points[i]
          const second = points[j]
          const dx = first.x - second.x
          const dy = first.y - second.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = width < 720 ? 104 : 132

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.22
            context.strokeStyle = `rgba(143, 207, 255, ${alpha})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(first.x, first.y)
            context.lineTo(second.x, second.y)
            context.stroke()
          }
        }
      }

      points.forEach(point => {
        const pulse = 0.55 + Math.sin(frame * 0.025 + point.x * 0.01) * 0.28
        context.fillStyle = `hsla(${point.hue}, 86%, 68%, ${0.5 + pulse * 0.35})`
        context.beginPath()
        context.arc(point.x, point.y, point.size + pulse * 0.7, 0, Math.PI * 2)
        context.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="kh-constellation-canvas" aria-hidden />
}
