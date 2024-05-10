import { USER_TOKEN } from "../store/slices/accountSlice";

export default interface IUser {
  id?: number;
  username?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  role?: Role;
}

export enum Role {
  USER,
  ADMIN,
}

export const getUserFromStorage = () =>
  Number(
    localStorage.getItem(USER_TOKEN) ??
      sessionStorage.getItem(USER_TOKEN) ??
      undefined
  );
