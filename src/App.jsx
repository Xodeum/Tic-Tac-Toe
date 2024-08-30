import { useState } from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import Footer from "./components/Footer.jsx";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].Player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function checkWinner(gameBoard) {
  const lines = [
    // Horizontal
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Vertical
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonal
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [[a, b], [c, d], [e, f]] = line;
    if (gameBoard[a][b] && gameBoard[a][b] === gameBoard[c][d] && gameBoard[a][b] === gameBoard[e][f]) {
      return gameBoard[a][b];
    }
  }
  return null;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [winner, setWinner] = useState(null);
  const [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectPlayer(rowindex, colIndex) {
    if (winner || gameBoard[rowindex][colIndex]) return; // Stop if there's already a winner or the square is taken

    const newGameTurns = [{ square: { row: rowindex, col: colIndex }, Player: activePlayer }, ...gameTurns];

    const updatedGameBoard = gameBoard.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowindex && cIdx === colIndex) {
          return activePlayer;
        }
        return cell;
      })
    );

    const winnerSymbol = checkWinner(updatedGameBoard);
    if (winnerSymbol) {
      const winnerName = winnerSymbol === 'X' ? player1Name : player2Name;
      setWinner(winnerName);
    } else if (newGameTurns.length === 9) {
      setWinner("Draw");
    }

    setGameTurns(newGameTurns);
    setGameBoard(updatedGameBoard);
  }

  function handleRestart() {
    setGameTurns([]);
    setWinner(null);
    setGameBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]); // Reset the game board
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player initialName={player1Name} symbol="X" isActive={activePlayer === "X"} onSaveName={setPlayer1Name} />
          <Player initialName={player2Name} symbol="O" isActive={activePlayer === "O"} onSaveName={setPlayer2Name} />
        </ol>
        <GameBoard onSelectSquare={handleSelectPlayer} gameBoard={gameBoard} />
        {winner && (
          <div>
            <p>{winner === "Draw" ? "It's a draw! Game over." : `${winner} wins!`}</p>
            <button id="restart-button" onClick={handleRestart}>Restart Game</button>
          </div>
        )}
        <Log turns={gameTurns} />
      </div>
      <Footer />
    </main>
  );
}

export default App;

