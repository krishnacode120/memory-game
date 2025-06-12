import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const allCardImages = [
  "aero-bike", "bird-scepter", "castle", "dagger-rose", "fishing",
  "haunting", "helicopter", "helmet", "potion", "ring",
  "robe", "robot-golem", "rolling-dices", "scroll", "shambling-zombie",
  "shield", "snake-spiral", "sword", "wolf-head"
];

const getRandomCardSet = () => {
  const shuffled = [...allCardImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8).map((name) => ({
    src: `/img/${name}.png`,
    matched: false,
  }));
};

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Timer
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
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
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

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div>
      <Button onClick={shuffleCards}>🔁 Restart</Button>
      <Stats>
        <span>Turns: {turns}</span>
        <span>Time: {elapsed}s</span>
      </Stats>
      <Board>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </Board>
      {gameWon && <WinText>🎉 You Won in {turns} turns & {elapsed}s!</WinText>}
    </div>
  );
};

export default GameBoard;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
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
