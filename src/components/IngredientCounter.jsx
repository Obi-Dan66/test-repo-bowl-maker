import React from 'react'
import { ALL_IDS, INGREDIENTS } from '../ingredients.js'
import UndoButton from './UndoButton.jsx'

export default function IngredientCounter({ counts, total, onUndo, canUndo }) {
  return (
    <aside className="counter">
      <div className="counter-header">
        <span className="counter-title">Bowl Contents</span>
        <span className="counter-total">{Math.round(total)}%</span>
      </div>

      <ul className="counter-list">
        {ALL_IDS.map((id) => {
          const value = counts[id] || 0
          const active = value > 0
          return (
            <li
              key={id}
              className={`counter-row ${active ? 'active' : ''}`}
            >
              <span className="counter-name">{INGREDIENTS[id].name}</span>
              <span className="counter-value">{Math.round(value)}%</span>
            </li>
          )
        })}
      </ul>

      <UndoButton onUndo={onUndo} disabled={!canUndo} />
    </aside>
  )
}
