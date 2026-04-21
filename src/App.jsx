import React, { useCallback, useRef, useState } from 'react'
import IngredientPanel from './components/IngredientPanel.jsx'
import Bowl from './components/Bowl.jsx'
import FlyingPiece from './components/FlyingPiece.jsx'
import { LEFT_IDS, RIGHT_IDS, TOP_IDS } from './ingredients.js'

let pieceIdCounter = 0
const nextId = () => ++pieceIdCounter

const randBetween = (min, max) => min + Math.random() * (max - min)
const randInt = (min, max) => Math.floor(randBetween(min, max + 1))

export default function App() {
  const [fillLevel, setFillLevel] = useState(0)
  const [pieces, setPieces] = useState([])
  const [landedPieces, setLandedPieces] = useState([])
  const bowlRef = useRef(null)

  const removePiece = useCallback((id) => {
    setPieces((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const handleIngredientClick = useCallback((ingredient, origin) => {
    const bowlEl = bowlRef.current
    if (!bowlEl) return

    const bowlRect = bowlEl.getBoundingClientRect()
    const bowlCenterX = bowlRect.left + bowlRect.width / 2
    const bowlTopY = bowlRect.top + bowlRect.height * 0.3

    const total = randInt(3, 12)
    const newPieces = []
    const willLand = []

    for (let i = 0; i < total; i++) {
      const jitterX = randBetween(-20, 20)
      const jitterY = randBetween(-15, 15)
      const x0 = origin.x + jitterX
      const y0 = origin.y + jitterY

      const landed = Math.random() < 0.6
      const scale = randBetween(0.8, 1.3)
      const rotation = randBetween(-45, 45)
      const duration = randInt(750, 1200)
      const arc = randBetween(160, 280)

      let x1, y1
      if (landed) {
        const spreadX = randBetween(-bowlRect.width * 0.3, bowlRect.width * 0.3)
        const spreadY = randBetween(-10, bowlRect.height * 0.35)
        x1 = bowlCenterX + spreadX
        y1 = bowlTopY + spreadY
      } else {
        const missDir = Math.random() < 0.5 ? -1 : 1
        x1 =
          bowlCenterX +
          missDir * randBetween(bowlRect.width * 0.55, bowlRect.width * 0.9)
        y1 = bowlTopY + randBetween(20, bowlRect.height * 0.6)
      }

      const piece = {
        id: nextId(),
        shape: ingredient.shape,
        colorClass: ingredient.colorClass,
        x0,
        y0,
        x1,
        y1,
        arc,
        rotation,
        duration,
        scale,
        missed: !landed,
      }

      newPieces.push(piece)

      if (landed) {
        willLand.push({
          id: piece.id,
          shape: piece.shape,
          colorClass: piece.colorClass,
          localX: x1 - bowlRect.left - 14,
          localY: y1 - bowlRect.top - 8,
          finalRotation: rotation + 360,
          scale,
          duration,
        })
      }
    }

    setPieces((prev) => [...prev, ...newPieces])

    willLand.forEach((lp) => {
      setTimeout(() => {
        setLandedPieces((prev) => {
          const next = [...prev, lp]
          return next.length > 40 ? next.slice(next.length - 40) : next
        })
      }, lp.duration)
    })

    setFillLevel((prev) => Math.min(100, prev + 10))
  }, [])

  const handleSubmit = useCallback(() => {
    console.log('Next step')
  }, [])

  return (
    <div className="stage">
      <header className="header">
        <h1>Shisha Bowl Prep</h1>
        <p>click ingredients to fill the bowl &mdash; +10% per click</p>
      </header>

      <IngredientPanel
        side="left"
        label="SWEET"
        ids={LEFT_IDS}
        onIngredientClick={handleIngredientClick}
      />
      <IngredientPanel
        side="right"
        label="SOUR"
        ids={RIGHT_IDS}
        onIngredientClick={handleIngredientClick}
      />
      <IngredientPanel
        side="top"
        label="EXTRAS"
        ids={TOP_IDS}
        onIngredientClick={handleIngredientClick}
      />

      <Bowl
        ref={bowlRef}
        fillLevel={fillLevel}
        landedPieces={landedPieces}
        onSubmit={handleSubmit}
      />

      {pieces.map((p) => (
        <FlyingPiece key={p.id} piece={p} onDone={removePiece} />
      ))}
    </div>
  )
}
