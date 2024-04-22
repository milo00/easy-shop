import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import api, { BASE_URL } from "../config/axiosInterceptor";
import IItem from "../models/item";
import CartItem from "../components/cartItem";

const Cart = () => {
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const [items, setItems] = useState<Map<IItem, number>>(new Map());
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchItems = async () => {
      const params = {
        params: { ids: cartItems.items.map((i) => i.id).join(",") },
      };
      debugger;
      const data = await api.get(`${BASE_URL}/items/ids`, params);
      const newItems = new Map<IItem, number>();
      data.data.forEach((d: IItem) => {
        const quantity = cartItems.items.find((i) => i.id === d.id)?.quantity;
        quantity && newItems.set(d, quantity);
      });
      setItems(newItems);
    };

    fetchItems();
  }, [cartItems]);

  console.log(items);

  return (
    <>
      {Array.from(items.entries()).map((i) => (
        <CartItem item={i[0]} quantity={i[1]} />
      ))}
    </>
  );
};

export default Cart;
