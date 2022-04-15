import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

const httpLink: ApolloLink = createHttpLink({
  uri: process.env.NODE_ENV === "production" ? "https://nomadcoffee-gw.herokuapp.com/graphql" : "http://localhost:4000/graphql",
});

const authLink: ApolloLink = setContext((_, { headers }) => {
  return { headers: { ...headers, token: localStorage.getItem(TOKEN) } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
