import { ACCESS_TOKEN } from "../store/slices/accountSlice";

export const isAuthenticated = () => {
  return (
    localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)
  );
};
