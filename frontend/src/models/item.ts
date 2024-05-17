export default interface IItem {
  id?: number;
  name?: string;
  regularPrice?: number;
  imgUrl?: string;
  gender?: Gender;
  productType?: IProductType;
  currentPrice?: number;
}

export interface IProductType {
  productType: string;
  subcategory: string;
  category: Category;
}
export enum Category {
  FOOTWEAR = "OBUWIE",
  APPAREL = "ODZIEŻ",
}

export enum Gender {
  GIRLS = "DZIEWCZYNKI",
  BOYS = "CHŁOPCY",
  MEN = "MĘŻCZYŹNI",
  WOMEN = "KOBIETY",
  KIDS = "DZIECI",
}

export const isBoysOrGirlsGender = (gender?: Gender) =>
  gender === Gender.BOYS || gender === Gender.GIRLS;

export const isGenderKey = (value?: string) => value && value in Gender;

export const isCategoryKey = (value?: string) => value && value in Category;

export const getGenderTranslation = (key?: string): string | undefined =>
  Gender[key as keyof typeof Gender];

export const getCategoryTranslation = (key?: string): string | undefined =>
  Category[key as keyof typeof Category];

export const getGenderFromTranslation = (
  value?: string
): Gender | undefined => {
  const entry = Object.entries(Gender).find(
    ([_, val]) => val === value?.toUpperCase()
  );
  return entry ? Gender[entry[0] as keyof typeof Gender] : undefined;
};

export const getCategoryFromTranslation = (
  value?: string
): Category | undefined => {
  const entry = Object.entries(Category).find(
    ([_, val]) => val === value?.toUpperCase()
  );
  return entry ? Category[entry[0] as keyof typeof Category] : undefined;
};
