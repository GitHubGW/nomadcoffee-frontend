import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { isDarkModeVar } from "./apollo";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/themes";

const App = () => {
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  return (
    <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
