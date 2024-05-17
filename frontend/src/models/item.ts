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
