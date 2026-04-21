import React from 'react'
import Ingredient from './Ingredient.jsx'
import { INGREDIENTS } from '../ingredients.js'

export default function IngredientPanel({ side, label, ids, onIngredientClick }) {
  return (
    <div className={`panel ${side}`}>
      <span className="panel-label">{label}</span>
      {ids.map((id) => (
        <Ingredient
          key={id}
          ingredient={INGREDIENTS[id]}
          onClick={onIngredientClick}
        />
      ))}
    </div>
  )
}
