import { useState, useEffect } from "react";
import api, { BASE_URL } from "../../config/axiosInterceptor";
import IItem, { getPrice } from "../../models/item";
import { IRootState } from "../../store/store";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";
import ICart, { ICheckoutItem } from "../../models/cart";
import _ from "lodash";

const applyChanges = (cartItems: ICart, items: IItem[]) => {
  const newItems: ICheckoutItem[] = [];
  let currentCost = "0";
  let newTotalItems = 0;
  items.forEach((d: IItem) => {
    const currentCartItems = cartItems.items.filter((i) => i.id === d.id);
    currentCartItems.forEach((i) => {
      currentCost = bigDecimal.add(
        currentCost,
        bigDecimal.multiply(getPrice(d), i.quantity)
      );
      newTotalItems += i.quantity;
      newItems.push({ ...d, ...i });
    });
  });

  return { currentCost, newItems, newTotalItems };
};

const useCartItems = () => {
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const [items, setItems] = useState<ICheckoutItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const params = {
        params: { ids: _.uniq(cartItems.items.map((i) => i.id)).join(",") },
      };
      setLoading(true);
      const data = await api.get(`${BASE_URL}/items/ids`, params);

      const { currentCost, newItems, newTotalItems } = applyChanges(
        cartItems,
        data.data
      );

      setItems(newItems);
      setTotalCost(Number.parseFloat(currentCost));
      setTotalItems(newTotalItems);
      setLoading(false);
    };

    const itemsIds = _.uniq(items.map((i) => i.id));

    if (
      _.uniq(cartItems.items.map((i) => i.id)).some(
        (ci) => !itemsIds.includes(ci)
      )
    ) {
      fetchItems();
    } else {
      const { currentCost, newItems, newTotalItems } = applyChanges(
        cartItems,
        _.uniqBy(items, "id")
      );
      setItems(newItems);
      setTotalItems(newTotalItems);
      setTotalCost(Number.parseFloat(currentCost));
    }
  }, [cartItems]); // eslint-disable-line

  return {
    items: _.sortBy(items, ["id", "size"]),
    loading,
    totalCost,
    totalItems,
  };
};

export default useCartItems;
