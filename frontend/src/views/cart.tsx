import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/checkout/cartItem";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import { clear } from "../store/slices/cartSlice";
import EmptyCart from "./emptyCart";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/checkout/orderSummary";
import useCartItems from "../utils/hooks/useCartItems";
import { IRootState } from "../store/store";
import Loader from "../components/loader/loader";
import { Fragment } from "react/jsx-runtime";
import { MouseEvent, useState } from "react";
import api, { BASE_URL } from "../config/axiosInterceptor";
import { startTimer } from "../store/slices/userIrritationTimeSlice";

export const DISCOUNT_PERCENT_TOKEN = "DISCOUNT_PERCENT_TOKEN";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeText, setPromoCodeText] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loadingDiscount, setLoadingDiscount] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const { items, loading, totalCost, totalItems } = useCartItems();

  if (cartItems.items.length === 0) {
    return <EmptyCart />;
  }

  const validateCode = async (e: MouseEvent<HTMLButtonElement>) => {
    if (loadingDiscount) return;

    try {
      e.currentTarget.blur();
      dispatch(startTimer());
      setLoadingDiscount(true);
      const response = await api.post(
        `${BASE_URL}/promo-code/validate`,
        promoCode
      );

      setLoadingDiscount(false);
      setPromoCodeText("promo code applied");
      setDiscount(response.data.discountPercent / 100);
      sessionStorage.setItem(
        DISCOUNT_PERCENT_TOKEN,
        response.data.discountPercent / 100 + ""
      );
    } catch (error: any) {
      setLoadingDiscount(false);
      setPromoCodeText(
        error.response?.status === 406
          ? "sorry, this code is not working :("
          : "something went wrong, please try again"
      );
    }
  };

  return (
    <Container className="mx-0 mt-5" fluid>
      <Row>
        <Col xs={0} md={1}></Col>
        <Col className="me-5">
          <Row className="justify-content-between">
            <h1 className="w-auto">YOUR CART</h1>
            {loading ? null : (
              <Button
                color="primary"
                outline
                role="button"
                onClick={() => dispatch(clear())}
                style={{
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                clear
              </Button>
            )}
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <Loader loading={loading}>
                <Row style={{ fontSize: "smaller", width: "100%" }}>
                  <span className="ps-0">{`in total (${totalItems} items): ${totalCost} PLN`}</span>
                  <span className="ps-0">
                    remember, adding items to Your cart does not automatically
                    reserve them
                  </span>
                </Row>
                <Row className="py-3 mt-3 mb-5 gap-4">
                  {items.map((i) => (
                    <Fragment key={`${i.id}-${i.size}`}>
                      <CartItem item={i} />
                    </Fragment>
                  ))}
                </Row>
              </Loader>
            </Col>
          </Row>
        </Col>
        {loading ? null : (
          <Col xs={12} md={4}>
            <Button
              className="mb-5"
              color="primary"
              role="button"
              onClick={() => navigate("/checkout")}
              style={{ width: "fit-content" }}
            >
              go to checkout
            </Button>
            <Row className="gap-3">
              <OrderSummary
                numOfItems={totalItems}
                totalCost={totalCost}
                discount={discount}
              />
              <div>
                <div className="d-flex justify-content-between gap-2">
                  <div className="w-100">
                    <Input
                      placeholder="promo code"
                      onChange={(e) => setPromoCode(e.currentTarget.value)}
                      disabled={loadingDiscount}
                    />
                  </div>
                  <Button outline color="primary" onClick={validateCode}>
                    {loadingDiscount ? (
                      <Spinner style={{ width: "1rem", height: "1rem" }} />
                    ) : (
                      "add"
                    )}
                  </Button>
                </div>
                <span style={{ fontSize: "small" }}>{promoCodeText}</span>
              </div>
            </Row>
          </Col>
        )}
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default Cart;
