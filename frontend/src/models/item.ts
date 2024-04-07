export default interface IItem {
  id: number;
  name: string;
  regularPrice: number;
  imgUrl: string;
  gender: Gender;
  productType: IProductType;
  currentPrice?: number;
}

export interface IProductType {
  productType: string;
  subcategory: string;
  category: Category;
}
export enum Category {
  FOOTWEAR,
  APPAREL,
}

export enum Gender {
  GIRLS,
  BOYS,
  MEN,
  WOMEN,
}
