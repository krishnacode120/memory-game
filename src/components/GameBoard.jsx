import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const allCardImages = [
  "aero-bike", "bird-scepter", "castle", "dagger-rose", "fishing",
  "haunting", "helicopter", "helmet", "potion", "ring",
  "robe", "robot-golem", "rolling-dices", "scroll", "shambling-zombie",
  "shield", "snake-spiral", "sword", "wolf-head"
];

const GameBoard = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const getRandomCardSet = () => {
    const pairCount = (gridSize * gridSize) / 2;
    const shuffled = [...allCardImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, pairCount).map((name) => ({
      src: process.env.PUBLIC_URL + `/img/${name}.png`,
      matched: false,
    }));
  };

  useEffect(() => {
    shuffleCards();
  }, [gridSize]);

  useEffect(() => {
    let timer;
    if (startTime && !gameWon) {
      timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, gameWon]);

  const shuffleCards = () => {
    const baseCards = getRandomCardSet();
    const shuffled = [...baseCards, ...baseCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setElapsed(0);
    setStartTime(Date.now());
    setGameWon(false);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div>
      <Select onChange={(e) => setGridSize(Number(e.target.value))} value={gridSize}>
        <option value={4}>🟢 Easy (4x4)</option>
        <option value={6}>🟡 Medium (6x6)</option>
      </Select>

      <Button onClick={shuffleCards}>🔁 Restart</Button>
      <Stats>
        <span>Turns: {turns}</span>
        <span>Time: {elapsed}s</span>
      </Stats>

      <Board columns={gridSize}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            matched={card.matched}
            disabled={disabled}
          />
        ))}
      </Board>

      {gameWon && <WinText>🎉 You Won in {turns} turns & {elapsed}s!</WinText>}
    </div>
  );
};

export default GameBoard;

// Styled Components

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 100px);
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #00ffc8;
  color: black;
  border: none;
  padding: 10px 20px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #00bfa5;
  }
`;

const Stats = styled.div`
  color: #00ffc8;
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 1.1rem;
`;

const WinText = styled.div`
  margin-top: 25px;
  font-size: 1.4rem;
  color: #39ff14;
  text-shadow: 0 0 5px #00ff95, 0 0 10px #00ff95;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 6px;
`;
