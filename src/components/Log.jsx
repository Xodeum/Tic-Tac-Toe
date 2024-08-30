export default function Log({ turns }) {
    return (
      <ol id="log">
        {turns.map((turn, index) => (
          <li key={`${turn.square.row}-${turn.square.col}-${index}`}>
            {turn.Player} selected row {turn.square.row + 1}, col {turn.square.col + 1}
          </li>
        ))}
      </ol>
    );
  }
  