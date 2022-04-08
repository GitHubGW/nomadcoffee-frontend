import { makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(false);
export const isDarkModeVar = makeVar<boolean>(false);
