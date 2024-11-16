import { useState } from "react";
import "./Game.css";

enum Vals {
  ROCK,
  PAPER,
  SCISSORS,
}

const Game = () => {
  const [playerVal, setPlayerVal] = useState<Vals | null>(null);
  const [computerVal, setComputerVal] = useState<Vals | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const enumValues = Object.keys(Vals)
    .filter((key) => isNaN(Number(key))) // Filter out numeric keys
    .map((key) => Vals[key as keyof typeof Vals]);

  const getRandomEnumValue = (): Vals => {
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  };

  const play = (val: Vals) => {
    const computerChoice = getRandomEnumValue();
    setPlayerVal(val);
    setComputerVal(computerChoice);

    if (val === computerChoice) {
      // It's a tie
      return;
    }

    if (
      (val === Vals.ROCK && computerChoice === Vals.SCISSORS) ||
      (val === Vals.PAPER && computerChoice === Vals.ROCK) ||
      (val === Vals.SCISSORS && computerChoice === Vals.PAPER)
    ) {
      setPlayerScore(playerScore + 1);
    } else {
      setComputerScore(computerScore + 1);
    }
  };

  const getChoiceName = (val: Vals | null) => {
    switch (val) {
      case Vals.ROCK:
        return "Rock";
      case Vals.PAPER:
        return "Paper";
      case Vals.SCISSORS:
        return "Scissors";
      default:
        return "None";
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Rock, Paper, Scissors Game</h1>
      <div>
        <button onClick={() => play(Vals.ROCK)}>Rock</button>
        <button onClick={() => play(Vals.PAPER)}>Paper</button>
        <button onClick={() => play(Vals.SCISSORS)}>Scissors</button>
      </div>
      <div className="content">
        <p>Your choice: {getChoiceName(playerVal)}</p>
        <p>Computer's choice: {getChoiceName(computerVal)}</p>
        <h2>Your Score: {playerScore}</h2>
        <h2>Computer Score: {computerScore}</h2>
      </div>
    </div>
  );
};

export default Game;
