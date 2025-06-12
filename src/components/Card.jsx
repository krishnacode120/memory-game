import React from "react";
import styled from "styled-components";

const Card = ({ card, handleChoice, flipped, matched, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      const flipSound = new Audio(process.env.PUBLIC_URL + "/sounds/flip.mp3");
      flipSound.play();
      handleChoice(card);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardInner flipped={flipped} matched={matched}>
        <CardFront src={card.src} alt="card front" />
        <CardBack src={process.env.PUBLIC_URL + "/img/cover.png"} alt="card back" />
      </CardInner>
    </CardContainer>
  );
};

export default Card;

// Styled Components
const CardContainer = styled.div`
  width: 100px;
  height: 100px;
  perspective: 1000px;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  box-shadow: ${({ matched }) =>
    matched ? "0 0 15px 4px #00ffcc, 0 0 30px #00ffcc" : "none"};
  border-radius: 10px;
`;

const CardFace = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFace)`
  transform: rotateY(180deg);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(0deg);
  background-color: #222;
`;
