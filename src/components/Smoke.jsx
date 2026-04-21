import React, { useEffect, useRef, useState } from 'react'

let smokeIdCounter = 0
const nextSmokeId = () => ++smokeIdCounter

const particlesPerSecond = (strength) => {
  const clamped = Math.max(1, Math.min(10, strength))
  return 2 + ((clamped - 1) * 13) / 9
}

export default function Smoke({ strength, originRef }) {
  const [particles, setParticles] = useState([])
  const strengthRef = useRef(strength)

  useEffect(() => {
    strengthRef.current = strength
  }, [strength])

  useEffect(() => {
    let timeoutId
    let cancelled = false

    const spawn = () => {
      if (cancelled) return

      const originEl = originRef.current
      if (originEl) {
        const rect = originEl.getBoundingClientRect()
        const baseX = rect.left + rect.width / 2
        const baseY = rect.top + rect.height * 0.25
        const s = strengthRef.current

        const x = baseX + (Math.random() - 0.5) * (rect.width * 0.6)
        const y = baseY + (Math.random() - 0.5) * 10
        const drift = (Math.random() - 0.5) * (80 + s * 10)
        const rise = 260 + s * 20 + Math.random() * 120
        const size = 22 + Math.random() * 28 + s * 1.2
        const duration = 2200 + Math.random() * 1800
        const opacity = 0.35 + (s / 10) * 0.4

        const p = {
          id: nextSmokeId(),
          x,
          y,
          drift,
          rise,
          size,
          duration,
          opacity,
        }
        setParticles((prev) => [...prev, p])
      }

      const perSec = particlesPerSecond(strengthRef.current)
      const interval = 1000 / perSec
      timeoutId = setTimeout(spawn, interval)
    }

    spawn()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [originRef])

  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="smoke-layer">
      {particles.map((p) => (
        <div
          key={p.id}
          className="smoke-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--drift': `${p.drift}px`,
            '--rise': `-${p.rise}px`,
            '--dur': `${p.duration}ms`,
            '--start-opacity': p.opacity,
          }}
          onAnimationEnd={() => removeParticle(p.id)}
        />
      ))}
    </div>
  )
}
