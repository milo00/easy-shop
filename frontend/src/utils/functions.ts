import { Location } from "react-router-dom";

export const isKeyOfEnum = (keys: string[], key: string | undefined) =>
  key && keys.includes(key?.toUpperCase());

export const equalsIgnoreCase = (fst?: string, snd?: string) =>
  fst?.toLowerCase() === snd?.toLowerCase();

export const isSalePath = (location: Location) =>
  location.pathname.includes("/sale");

export const isKidsPath = (location: Location) =>
  location.pathname.includes("/kids/");
