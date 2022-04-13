import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { client, isDarkModeVar } from "./apollo";
import { lightTheme, darkTheme } from "./styles/themes";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
