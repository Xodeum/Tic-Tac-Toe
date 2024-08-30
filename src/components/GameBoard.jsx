export default function GameBoard({ onSelectSquare, gameBoard }) {
    return (
      <ol id="game-board">
        {gameBoard.map((row, rowindex) => (
          <li key={rowindex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => onSelectSquare(rowindex, colIndex)}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
  