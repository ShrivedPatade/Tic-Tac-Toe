# Tic-Tac-Toe: Player vs Player and Player vs Computer Modes

This React-based **Tic-Tac-Toe** project provides two gameplay modes:
- **Player vs Player (PVP)** mode: Two players take turns playing on the same device.
- **Player vs Computer (PVC)** mode: Play against an AI opponent powered by the **Alpha-Beta Pruning** algorithm for optimal gameplay.

The project tracks scores, switches turns dynamically, and ensures seamless gameplay for both modes.

---

## Features

### Common Features:
- **Interactive Gameplay**:
  - Real-time updates to the grid based on player moves.
  - Visual indication of the current turn.
- **Score Tracking**: Keeps track of scores for Player 1 and Player 2 (or Computer in PVC mode).
- **Dynamic Turn Handling**:
  - The winner of each round starts the next game.
  - In case of a draw, the turn alternates.
- **Reset After Each Round**: The game resets automatically with a brief message indicating the winner or a draw.

### Player vs Player (PVP) Mode:
- Two players compete by taking turns on the same device.
- Player 1 uses the symbol `O`, and Player 2 uses the symbol `X`.

### Player vs Computer (PVC) Mode:
- Play against an AI opponent.
- The AI uses **Alpha-Beta Pruning** for efficient and optimal decision-making.
- Choose whether Player 1 (`O`) or Player 2 (`X`) will play first.

---

## Technology Stack

- **Frontend**: React.js
- **AI Algorithm**: Alpha-Beta Pruning for the Computer opponent in PVC mode.
- **Styling**: Tailwind css, CSS (custom styles for the Tic-Tac-Toe grid and cells)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/CrazyBeastable/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## How to Play

### PVP Mode:
1. Players take turns clicking on empty cells in the 3x3 grid.
2. Player 1 (`O`) and Player 2 (`X`) try to align three symbols in a row, column, or diagonal to win.
3. The winner starts the next round; in case of a draw, the turn alternates.

### PVC Mode:
1. Select whether Player 1 (`O`) or Player 2 (`X`) will go first.
2. The AI opponent will make moves automatically based on the **Alpha-Beta Pruning** algorithm.
3. Try to beat the AI by aligning three symbols in a row, column, or diagonal.

---

## File Structure

```plaintext
src/
├── pages/
│   ├── PVP.js           // PVP mode logic and UI
│   ├── PVC.js           // PVC mode logic and AI implementation
│   ├── Score.js         // Component to display scores
│   ├── Grid.js         // Component to display scores
│   ├── Cell.js         // Component to display scores
│   ├── Header.js         // Component to display scores
│   ├── Home.js         // Component to display scores
│   ├── Message.js       // Component to display game messages
├── App.js               // Root application component
├── App.css              // Styles for the overall App
├── ScoreBoard.css       // Styles for the Score Board
├── Grid.css             // Styles for the grid and cells
└── index.js             // Application entry point
```

---

## AI Logic: Alpha-Beta Pruning

- The algorithm evaluates possible moves, simulates outcomes, and minimizes/maximizes scores for the computer and player, respectively.
- **Alpha-Beta Pruning** optimizes the decision-making process by eliminating unnecessary computations, ensuring the AI responds quickly and strategically.

---

## Customization

- **Symbols**: Change the player symbols (`O` and `X`) by modifying the respective components.
- **Grid Size**: For larger grids (e.g., 4x4 or 5x5), update the `grid` state initialization and winning conditions in both `PVP` and `PVC` components.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---


## Acknowledgments

- The AI implementation uses the **Alpha-Beta Pruning** algorithm for efficient decision-making.

---

**Happy Coding!** 🎮✨
