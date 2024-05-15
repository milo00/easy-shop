import { USER_TOKEN } from "../utils/localStorageTokens";

export default interface IUser {
  id?: number;
  username?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  yearOfBirth?: number;
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
