import React from 'react'

export default function UndoButton({ onUndo, disabled }) {
  return (
    <button
      className="undo-btn"
      onClick={onUndo}
      disabled={disabled}
      title={disabled ? 'Nothing to undo' : 'Undo last action'}
    >
      &larr; Undo
    </button>
  )
}
