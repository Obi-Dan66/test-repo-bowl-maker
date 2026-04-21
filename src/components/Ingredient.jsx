import React from 'react'

export function IngredientShape({ shape, colorClass, style, className = '' }) {
  const classes = `shape ${shape} ${colorClass} ${className}`
  return <div className={classes} style={style} />
}

export default function Ingredient({ ingredient, onClick }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    onClick(ingredient, { x, y })
  }

  return (
    <div className="ingredient" onClick={handleClick} title={ingredient.name}>
      <div className="plate">
        <div className="plate-contents">
          <IngredientShape
            shape={ingredient.shape}
            colorClass={ingredient.colorClass}
            className="pos-1"
          />
          <IngredientShape
            shape={ingredient.shape}
            colorClass={ingredient.colorClass}
            className="pos-2"
          />
          <IngredientShape
            shape={ingredient.shape}
            colorClass={ingredient.colorClass}
            className="pos-3"
          />
          <IngredientShape
            shape={ingredient.shape}
            colorClass={ingredient.colorClass}
            className="pos-4"
          />
        </div>
      </div>
      <div className="ingredient-name">{ingredient.name}</div>
    </div>
  )
}
