# Hand Betting Game 🀄

A browser-based, Mahjong-tile betting game built with **React Router 8**, **React 19**, **TypeScript**, **Zustand**, and **Tailwind CSS**. Players are given a three-tile hand, see its calculated value, and bet on whether their _next_ hand will be higher or lower. Scores are stored to a global leaderboard backed by **Firebase Firestore**.

--

## Overview

- The player is given a hand of three tiles.
- The app calculates a numeric value for the hand (numbered suits contribute their rank; "honor" tiles — winds and dragons — contribute a dynamic value).
- The player bets **higher** or **lower**, predicting how the value of the _next_ hand drawn will compare to the current one.
- A correct bet increases the player's score, while an incorrect bet decreases it.
- Honor tile values shift up or down after every round based on the outcome, and the game ends once an honor value goes out of bounds or the deck runs out of shuffles.
- Final scores are saved to a Firestore-backed leaderboard, showing the top players.

## Tech Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| Framework        | React Router 8 (framework mode, SSR)     |
| UI library       | React 19                                 |
| Language         | TypeScript                               |
| Styling          | Tailwind CSS 4                           |
| State management | Zustand                                  |
| Animation        | Motion (Framer Motion successor), OGL    |
| Backend / data   | Firebase (Firestore) for the leaderboard |
| Build tool       | Vite 8                                   |

## Prerequisites

Before running the project locally, make sure you have:

- **Node.js** (v20 or later recommended; the Docker image uses Node 24)
- **npm** (bundled with Node.js)
- Optionally, **Docker**, if you prefer to run the app in a container

## Getting Started

Clone the repository and move into the project folder:

```bash
git clone https://github.com/emanaradi/Hand-Betting-Game.git
cd Hand-Betting-Game
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

By default the app will be available at:

```
http://localhost:5173
```

## Project Structure

```
Hand-Betting-Game/
├── app/
│   ├── components/        # UI components (Hand, TileCard, Pile, BettingButton, Leaderboard, Aurora background, ...)
│   ├── lib/
│   │   ├── deck/           # Deck construction and draw/discard/shuffle management
│   │   ├── game/           # Core game engine (GameEngine, DeckManager)
│   │   └── hand/           # Hand value calculation and comparison logic
│   ├── routes/
│   │   ├── home.tsx        # Landing / player setup route
│   │   └── game.tsx        # Main game screen route
│   ├── services/
│   │   ├── firebase.ts     # Firebase app initialization
│   │   └── leaderboard.ts  # Firestore read/write for leaderboard scores
│   ├── store/
│   │   └── gameStore.ts    # Zustand store for client-side game state
│   ├── types/              # Shared TypeScript types (Tile, GameState, HonorTileValues, ...)
│   ├── app.css             # Global styles (Tailwind entry point)
│   ├── root.tsx             # Root layout component
│   └── routes.ts           # Route configuration
├── public/                 # Static assets (tile SVGs, icons, favicon)
├── Dockerfile              # Multi-stage production Docker build
├── react-router.config.ts  # React Router configuration (SSR settings, etc.)
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Scripts and dependencies
```

## Game Logic

The core game logic lives in `app/lib/game/gameEngine.ts` and the helper modules in `app/lib/hand/`.

### Hand Value Calculation

`calculateHandValue` sums the value of each tile in a hand:

- **Numbered suits** (bamboo, dots, characters) contribute their printed rank.
- **Honor tiles** (winds: east, south, west, north; dragons: red, green, white) contribute a dynamic value tracked separately for each tile type, starting at **5**.

### Betting

A player chooses a `BetChoice` of `"higher"` or `"lower"` before the next hand is drawn. `compareHands` determines whether the bet was correct by comparing the new hand's value against the previous one.

### Scoring

- **Win:** the player's score increases by the higher of the old/new hand value, plus a flat bonus of 10.
- **Loss:** the player's score decreases by 10 (score is not reduced below the point where it would go negative from this deduction if it's already 10 or below).

### Honor Tile Value Drift

After each round, every honor tile present in the newly drawn hand has its tracked value adjusted: **+1** if the round was won, **−1** if it was lost. This means the "value" of wind and dragon tiles evolves as the game progresses.

### Game Over Conditions

The game ends when either of the following occurs:

1. Any honor tile's tracked value reaches **10 or higher**, or drops to **0 or below**.
2. The deck's shuffle limit has been reached (the deck has been reshuffled the maximum allowed number of times).

### Leaderboard

On game over, the player's name, gender selection, and final score can be persisted to the `Leaderboard` collection in Firestore via `saveScore`. `getTopScores` retrieves the top five scores, ordered by score descending, for display in the UI.
