export default interface IMenuData {
  genders: IMenuDataGender[];
}

export interface IMenuDataGender {
  name: string;
  categories: IMenuDataCategory[];
}

export interface IMenuDataCategory {
  name: string;
  subcategories: IMenuDataSubcategory[];
}

export interface IMenuDataSubcategory {
  name: string;
  productTypes: string[];
}

export function isMenuData(object: any): object is IMenuData {
  return "genders" in object;
}
