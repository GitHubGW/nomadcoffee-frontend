import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body{
    box-sizing: border-box;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a{
    color:inherit;
    text-decoration:none;
  }
`;

export default GlobalStyle;
