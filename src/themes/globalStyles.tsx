import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    width: 100%;
    height: 100%;
	  -moz-osx-font-smoothing: grayscale;
	  -webkit-font-smoothing: antialiased;
	  font-synthesis: none;
  }
	body {
    width: 100%;
		height: 100%;
		margin: 0;
  }
`;
