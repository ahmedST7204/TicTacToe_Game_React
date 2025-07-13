import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [bgLeft, setBgLeft] = useState("0");

  const handleClick = (index) => {
    if (!isGameOver && boxes[index] === "") {
      const newBoxes = [...boxes];
      newBoxes[index] = turn;
      setBoxes(newBoxes);

      if (checkWin(newBoxes)) {
        setIsGameOver(true);
        setResult(`${turn} win`);
      } else if (checkDraw(newBoxes)) {
        setIsGameOver(true);
        setResult("Draw");
      } else {
        const nextTurn = turn === "X" ? "O" : "X";
        setTurn(nextTurn);
        setBgLeft(nextTurn === "X" ? "0" : "85px");
      }
    }
  };

  const checkWin = (b) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b1, c] = winConditions[i];
      if (b[a] !== "" && b[a] === b[b1] && b[a] === b[c]) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = (b) => {
    return b.every((e) => e !== "");
  };

  const playAgain = () => {
    setBoxes(Array(9).fill(""));
    setTurn("X");
    setIsGameOver(false);
    setResult("");
    setBgLeft("0");
  };

  return (
    <div>
      <div className="turn-container">
        <h3>Turn For</h3>
        <div className="turn-box align">X</div>
        <div className="turn-box align">O</div>
        <div className="bg" style={{ left: bgLeft }}></div>
      </div>
      <div className="main-grid">
        {boxes.map((value, index) => (
          <div
            key={index}
            className="box align"
            onClick={() => handleClick(index)}
            style={
              isGameOver &&
              checkWin(boxes) &&
              winningCombination(boxes).includes(index)
                ? { backgroundColor: "#08D9D6", color: "#000" }
                : { color: "#fff" }
            }
          >
            {value}
          </div>
        ))}
      </div>
      <h2 id="results">{result}</h2>
      <button
        id="play-again"
        style={{ display: isGameOver ? "inline" : "none" }}
        onClick={playAgain}
      >
        Play Again
      </button>
    </div>
  );
};

// Helper function to get winning combination
const winningCombination = (b) => {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b1, c] = winConditions[i];
    if (b[a] !== "" && b[a] === b[b1] && b[a] === b[c]) {
      return winConditions[i];
    }
  }
  return [];
};

export default TicTacToe;
