import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

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
  input{
    all:unset;
  }
`;

export default GlobalStyle;
