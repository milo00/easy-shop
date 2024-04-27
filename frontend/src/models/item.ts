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
  FOOTWEAR = "FOOTWEAR",
  APPAREL = "APPAREL",
}

export enum Gender {
  GIRLS = "GIRLS",
  BOYS = "BOYS",
  MEN = "MEN",
  WOMEN = "WOMEN",
  KIDS = "KIDS",
}

export const getPrice = (item: IItem) => item.currentPrice ?? item.regularPrice;

export const isKidsGender = (gender?: Gender) =>
  gender === Gender.BOYS || gender === Gender.GIRLS;
