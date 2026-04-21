import React, { useMemo } from 'react'

const CONFETTI_COLORS = [
  '#ffb347',
  '#ff6a3d',
  '#7fe07a',
  '#ffd83a',
  '#ff8fb5',
  '#9fd5ff',
  '#c9e07a',
]

const CONFETTI_COUNT = 40

export default function SuccessScreen({ onRestart }) {
  const confetti = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 360,
      })),
    [],
  )

  return (
    <div className="success-stage">
      <div className="success-glow" />

      <div className="confetti-layer">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="confetti"
            style={{
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              '--drift': `${c.drift}px`,
              '--rot': `${c.rotation}deg`,
            }}
          />
        ))}
      </div>

      <div className="success-card">
        <div className="success-badge">&#10003;</div>
        <h2 className="success-title">Congrats!</h2>
        <p className="success-message">Your shisha is getting prepared.</p>
        <button className="submit-btn restart-btn" onClick={onRestart}>
          Start Again
        </button>
      </div>
    </div>
  )
}
