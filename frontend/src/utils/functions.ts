export const isKeyOfEnum = (keys: string[], key: string | undefined) =>
  key && keys.includes(key?.toUpperCase());

export const equalsIgnoreCase = (fst?: string, snd?: string) =>
  fst?.toLowerCase() === snd?.toLowerCase();
