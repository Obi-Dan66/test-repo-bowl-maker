import React from 'react'
import { IngredientShape } from './Ingredient.jsx'

export default function FlyingPiece({ piece, onDone }) {
  const style = {
    '--x0': `${piece.x0}px`,
    '--y0': `${piece.y0}px`,
    '--x1': `${piece.x1}px`,
    '--y1': `${piece.y1}px`,
    '--arc': `${piece.arc}px`,
    '--r0': `${piece.rotation}deg`,
    '--dur': `${piece.duration}ms`,
    transform: `scale(${piece.scale})`,
  }

  return (
    <div
      className={`flying-piece ${piece.missed ? 'miss' : ''}`}
      style={style}
      onAnimationEnd={() => onDone(piece.id)}
    >
      <IngredientShape
        shape={piece.shape}
        colorClass={piece.colorClass}
      />
    </div>
  )
}
