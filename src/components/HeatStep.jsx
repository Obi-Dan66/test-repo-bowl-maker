import React, { useRef, useState } from 'react'
import Smoke from './Smoke.jsx'

export default function HeatStep({ onSubmit }) {
  const [strength, setStrength] = useState(5)
  const lidRef = useRef(null)

  const glowLevel = strength / 10

  return (
    <div className="heat-stage">
      <header className="header">
        <h1>Heat Management - Strength</h1>
        <p>place coals, tune strength, watch the smoke</p>
      </header>

      <div className="heat-center">
        <div className="heat-bowl">
          <div className="heat-bowl-fill" />
          <div
            className="heat-lid"
            ref={lidRef}
            style={{ '--glow': glowLevel }}
          >
            <div className="coal coal-1" />
            <div className="coal coal-2" />
            <div className="coal coal-3" />
          </div>
        </div>
      </div>

      <Smoke strength={strength} originRef={lidRef} />

      <div className="heat-controls">
        <div className="strength-row">
          <span className="strength-label">Strength</span>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value, 10))}
            className="strength-slider"
          />
          <span className="strength-value">{strength}</span>
        </div>
        <button className="submit-btn order-btn" onClick={onSubmit}>
          Order Now
        </button>
      </div>
    </div>
  )
}
