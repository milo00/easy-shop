import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import api, { BASE_URL } from "../config/axiosInterceptor";
import IItem, { getPrice } from "../models/item";
import CartItem from "../components/cartItem";
import { Button, Container, Row } from "reactstrap";
import { clear } from "../store/slices/cartSlice";
var _ = require("lodash");

const Cart = () => {
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const [items, setItems] = useState<Map<IItem, number>>(new Map());
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      const params = {
        params: { ids: cartItems.items.map((i) => i.id).join(",") },
      };
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

  const itemsArray = Array.from(items.entries());

  return (
    <Container className="mx-0">
      <Row
        className="py-3 mt-3 mb-5"
        style={{ height: (window.innerHeight * 2) / 3, overflow: "auto" }}
      >
        {itemsArray.map((i) => (
          <CartItem item={i[0]} quantity={i[1]} />
        ))}
      </Row>

      {_.isEmpty(itemsArray) ? (
        <span>{"Your cart is empty :("}</span>
      ) : (
        <>
          <Row>
            <span>
              Total:{" "}
              {itemsArray
                .map((i) => (getPrice(i[0]) ?? 0) * i[1])
                .reduce((prev, next) => prev + next)}
              zł
            </span>
          </Row>
          <Row>
            <Button
              color="primary"
              onClick={() => dispatch(clear())}
              style={{ width: "fit-content" }}
            >
              Clear cart
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
