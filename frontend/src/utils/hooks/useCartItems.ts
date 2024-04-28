import { useState, useEffect } from "react";
import api, { BASE_URL } from "../../config/axiosInterceptor";
import IItem, { getPrice } from "../../models/item";
import { IRootState } from "../../store/store";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";

const useCartItems = () => {
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const [items, setItems] = useState<Map<IItem, number>>(new Map());
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const params = {
        params: { ids: cartItems.items.map((i) => i.id).join(",") },
      };
      const data = await api.get(`${BASE_URL}/items/ids`, params);

      const newItems = new Map<IItem, number>();
      let currentCost = "0";
      data.data.forEach((d: IItem) => {
        const quantity = cartItems.items.find((i) => i.id === d.id)?.quantity;
        quantity && newItems.set(d, quantity);
        currentCost = bigDecimal.add(currentCost, getPrice(d));
      });

      setItems(newItems);
      setTotalCost(Number.parseFloat(currentCost));
    };

    fetchItems();
  }, [cartItems]);

  return { items, totalCost };
};

export default useCartItems;
