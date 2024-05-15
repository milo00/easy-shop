import { ACCESS_TOKEN } from "./localStorageTokens";

export const isAuthenticated = () => {
  return (
    localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)
  );
};
