import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background-color: #ffff;
    font-family: 'Noto Sans KR';
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
