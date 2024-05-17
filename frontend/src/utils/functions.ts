import { Location } from "react-router-dom";

export const equalsIgnoreCase = (fst?: string, snd?: string) =>
  fst?.toLowerCase() === snd?.toLowerCase();

export const isSalePath = (location: Location) =>
  location.pathname.includes("/wyprzeda");

export const isKidsPath = (location: Location) =>
  location.pathname.includes("/dzieci/");

export const getEnumKeyFromValue = <
  T extends { [key: number]: string | number }
>(
  e: T,
  value?: string
): string | undefined => {
  const entry = Object.entries(e).find(([_, v]) => v === value?.toUpperCase());
  return entry ? entry[0] : undefined;
};

export const getEnumValueFromKey = <T extends { [key: number]: string }>(
  e: T,
  key?: string
): string | undefined => {
  const entry = Object.entries(e).find(([k, _]) => k === key?.toUpperCase());
  return entry ? entry[1] : undefined;
};

export const getEnumFromValue = <T extends { [key: number]: string | number }>(
  e: T,
  value?: string
): T[keyof T] | undefined => {
  const entry = Object.entries(e).find(([_, v]) => v === value?.toUpperCase());
  return entry ? e[entry[0] as keyof typeof e] : undefined;
};

export const isEnumValue = <T extends { [key: number]: string | number }>(
  e: T,
  value?: string
): boolean => !!value && Object.values(e).includes(value?.toUpperCase());

export const isEnumKey = <T extends { [key: number]: string | number }>(
  e: T,
  value?: string
): boolean => !!value && Object.keys(e).includes(value?.toUpperCase());
