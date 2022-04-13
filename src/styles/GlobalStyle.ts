import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset};

  *{
    box-sizing:border-box;
    font-family: 'Stylish', sans-serif;
  }
  body{
    box-sizing: border-box;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'Stylish', sans-serif;
    font-size:20px;
  }
  a{
    color:inherit;
    text-decoration:none;
  }
  input{
    all:unset;
    font-size:20px;
  }
`;

export default GlobalStyle;
