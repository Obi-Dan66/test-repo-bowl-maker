import React, { forwardRef } from 'react'
import { IngredientShape } from './Ingredient.jsx'

const Bowl = forwardRef(function Bowl(
  { fillLevel, landedPieces, onSubmit },
  ref,
) {
  const isFull = fillLevel >= 100
  return (
    <div className="bowl-wrap">
      <div className="bowl" ref={ref}>
        <div
          className="bowl-fill"
          style={{ height: `${Math.min(100, fillLevel)}%` }}
        />
        <div className="bowl-landed">
          {landedPieces.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.localX,
                top: p.localY,
                transform: `rotate(${p.finalRotation}deg) scale(${p.scale})`,
              }}
            >
              <IngredientShape shape={p.shape} colorClass={p.colorClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="meter">
        FILL<strong>{Math.round(fillLevel)}%</strong>
        <div className="meter-bar">
          <div
            className="meter-bar-fill"
            style={{ width: `${Math.min(100, fillLevel)}%` }}
          />
        </div>
      </div>

      {isFull && (
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      )}
    </div>
  )
})

export default Bowl
