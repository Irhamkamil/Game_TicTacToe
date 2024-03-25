/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  // membuat button square
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
// untuk memanggil props, harus menggunakan {}
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // jika kotak sudah terisi atau udah ada yang menang
    if (squares[i] || calculateWinner(squares)) return;
    // membuat array baru dari array squares agar bisa menggunakan fitur riwayat
    const nextSquares = squares.slice();
    // jika xIsNext true, maka nextSquares[i] = "X", jika false, maka nextSquares[i] = "O"
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setcurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  // keadaan terakhir dari gamenya
  const currentSquares = history[currentMove];

  function jumpto(nextMove) {
    setcurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    // agar bisa mengetahui keadaan terbaru
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // untuk mengatur history ke keadaan terakhir
    setcurrentMove(nextHistory.length - 1);
    // untuk menganti pemain dari X ke O
  }

  // ini untuk mengubah menjadi tombol
  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "Go to Move" + move;
    } else {
      description = "Go to game Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// mencari pemenang
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // baris 1
    [3, 4, 5], // baris 2
    [6, 7, 8], // baris 3
    [0, 3, 6], // kolom 1
    [1, 4, 7], // kolom 2
    [2, 5, 8], // kolom 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6] // diagonal 2
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // jika a, b, dan c sama, maka return a
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
