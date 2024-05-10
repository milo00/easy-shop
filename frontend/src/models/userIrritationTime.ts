import { IRRITATION_TIME_TOKEN } from "../store/slices/userIrritationTimeSlice";

export default interface IUserIrritationTime {
  id?: number;
  location?: string;
  elapsedTime?: number;
  userId?: number;
}

export function isUserIrritationTime(
  object: any
): object is IUserIrritationTime {
  return "location" in object && "elapsedTime" in object;
}

export const getIrrittaionTimeFromSessionStorage = (): IUserIrritationTime[] => {
  const userIrritationTimeBatchString = sessionStorage.getItem(
    IRRITATION_TIME_TOKEN
  );

  return userIrritationTimeBatchString
    ? JSON.parse(userIrritationTimeBatchString).filter(isUserIrritationTime)
    : [];
};
