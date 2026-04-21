# Shisha Bowl Maker

A small interactive minigame for "shisha bowl preparation". Click ingredients around the stage and watch pieces fly into the bowl. Each click adds exactly **10%** to the bowl fill. When the bowl hits 100%, a **Submit** button appears (logs `"Next step"` to the console).

## Stack
- React 18 + Vite
- Plain CSS (no Tailwind, no Three.js — CSS keyframe animations only)
- JavaScript

## Run

```bash
yarn install
yarn dev
```

Vite will print a local URL (usually `http://localhost:5173`).

Other scripts:
```bash
yarn build     # production build to ./dist
yarn preview   # preview the production build
```

## Layout
- **Left panel (SWEET):** Apple, Kiwi (moon slices), Banana (circles)
- **Right panel (SOUR):** Orange, Lemon (moon slices), Forest berries (small circles)
- **Top panel (EXTRAS):** Mint (leaves), Ice (cubes)
- **Bottom center:** bowl + fill meter

## Behavior
- Click any ingredient → 3–12 pieces spawn at the ingredient
- Each piece flies on an **arc** toward the bowl
- ~60% land (stay visible inside the bowl), the rest miss and fade out past the bowl
- Fill increases **+10% per click** (capped at 100), regardless of piece count
- At 100%, the `Submit` button appears and logs `"Next step"`

## Components
- `src/App.jsx` — state, click → spawn logic, piece lifecycle
- `src/components/Bowl.jsx` — bowl, fill bar, meter, submit button, landed pieces
- `src/components/IngredientPanel.jsx` — left/right/top container
- `src/components/Ingredient.jsx` — plate + preview shapes + click handler (also exports `IngredientShape`)
- `src/components/FlyingPiece.jsx` — single animated piece driven by CSS custom properties
- `src/ingredients.js` — ingredient definitions & panel groupings
- `src/styles.css` — all styling and `@keyframes fly` / `@keyframes flyMiss`

## Notes / trade-offs
- No physics engine; arcs are pure CSS keyframes driven by per-piece CSS variables (`--x0`, `--y0`, `--x1`, `--y1`, `--arc`, `--dur`, `--r0`).
- Positions are measured on click via `getBoundingClientRect()` on the ingredient and the bowl, so the animation stays correct on resize between clicks.
- Landed pieces accumulate inside the bowl (capped at 40 to keep DOM light).
