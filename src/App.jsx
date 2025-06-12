import React from "react";
import GameBoard from "./components/GameBoard";
import { GlobalStyle, AppContainer, Title } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>💡 Memory Card Game</Title>
        <GameBoard />
      </AppContainer>
    </>
  );
}

export default App;
