import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: #0d0d0d;
    color: white;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    padding: 20px;
  }
`;

export const AppContainer = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 10px;
  color: #00ffc8;
  text-shadow: 0 0 10px #00ffc8, 0 0 20px #00ffc8;
`;
