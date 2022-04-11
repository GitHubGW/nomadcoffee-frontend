import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN: string = "TOKEN";
const hasToken: boolean = Boolean(localStorage.getItem(TOKEN));

export const isLoggedInVar = makeVar<boolean>(hasToken);
export const isDarkModeVar = makeVar<boolean>(false);

export const handleLogin = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const handleLogout = (): void => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
