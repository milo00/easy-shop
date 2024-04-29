import IItem from "./item";

export default interface ICart {
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  size: string;
  quantity: number;
}

export interface ICheckoutItem extends IItem {
  size: string;
  quantity: number;
}
