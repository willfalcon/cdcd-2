import { createGlobalStyle, css } from 'styled-components';

const imgStyle = css`
  display: block;
  max-width: 100%;
  height: auto;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  :focus {
    outline-color: ${({ theme }) => theme.lightOrange};
  }
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.font.family};
    font-weight: 400;
    font-style: normal;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.dark};
    min-height: 100vh;
    /* @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.dark};
      color: ${({ theme }) => theme.offWhite};
    }  */
  }
  img {
    ${imgStyle}
  }
  h1 {
    font-family: ${({ theme }) => theme.font.heading};
    font-weight: ${({ theme }) => theme.font.black};
  }
  h2 {
    font-family: ${({ theme }) => theme.font.heading};
    line-height: 1.25;
    margin: 0;
    font-size: 2.8rem;
  }
  h3 {
    font-family: ${({ theme }) => theme.font.heading};
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    line-height: 1.15;
    margin: 0 0 .5rem;
    font-size: 1.6rem;
  }
  h4 {
    /* font-family: , sans-serif; */
    font-family: ${({ theme }) => theme.font.heading};
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
  }
  label {
    color: ${({ theme }) => theme.dark};
  }
  p {
    margin: 0 0 1rem;
    font-size: 1.6rem;
  }
  .text-center {
    text-align: center;
  }
  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }
  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeout}ms;
  }
  .flag {
    color: ${({ theme }) => theme.red};
  }

  .columns-2 {
    columns: 2;
  }
`;

export { imgStyle };
export default GlobalStyle;
