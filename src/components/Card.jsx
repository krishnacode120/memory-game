import React from "react";
import styled from "styled-components";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <CardWrapper onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img src="/img/cover.png" alt="card back" className="back" />
      </div>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100px;
  height: 100px;

  div {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  .flipped {
    transform: rotateY(180deg);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: absolute;
    backface-visibility: hidden;
  }

  .front {
    transform: rotateY(180deg);
  }

  .back {
    background: #222;
  }
`;
