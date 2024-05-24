import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/checkout/cartItem";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { clear } from "../store/slices/cartSlice";
import EmptyCart from "./emptyCart";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/checkout/orderSummary";
import useCartItems from "../utils/hooks/useCartItems";
import { IRootState } from "../store/store";
import { Fragment } from "react/jsx-runtime";
import { MouseEvent, useState } from "react";
import api, { BASE_URL } from "../config/axiosInterceptor";
import { startTimer } from "../store/slices/userIrritationTimeSlice";
import { DISCOUNT_PERCENT_TOKEN } from "../utils/localStorageTokens";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeText, setPromoCodeText] = useState("");
  const [discount, setDiscount] = useState(
    Number(sessionStorage.getItem(DISCOUNT_PERCENT_TOKEN)) ?? 0
  );
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
    setPromoCodeText("");
    sessionStorage.removeItem(DISCOUNT_PERCENT_TOKEN);
    setDiscount(0);

    try {
      e.currentTarget.blur();
      dispatch(startTimer());
      setLoadingDiscount(true);
      const response = await api.post(
        `${BASE_URL}/promo-code/validate`,
        promoCode
      );

      setLoadingDiscount(false);
      setPromoCodeText("zastosowano kod promocyjny");
      setDiscount(response.data.discountPercent / 100);
      sessionStorage.setItem(
        DISCOUNT_PERCENT_TOKEN,
        response.data.discountPercent / 100 + ""
      );
    } catch (error: any) {
      setLoadingDiscount(false);
      setPromoCodeText(
        error.response?.status === 406
          ? "przykro nam, ten kod nie działa :("
          : "coś poszło nie tak, spróbuj ponownie"
      );
    }
  };

  return (
    <Container className="mx-0 mt-5" fluid>
      <Row>
        <Col xs={0} md={1}></Col>
        <Col className="me-5">
          <Row className="justify-content-between">
            <h1 className="w-auto">TWÓJ KOSZYK</h1>
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
                wyczyść
              </Button>
            )}
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <Row style={{ fontSize: "smaller", width: "100%" }}>
                <span className="ps-0">{`w sumie (${totalItems} przedmiotów): ${totalCost} PLN`}</span>
                <span className="ps-0">
                  pamiętaj, dodanie przedmiotów do koszyka nie powoduje ich
                  automatycznej rezerwacji
                </span>
              </Row>
              <Row className="py-3 mt-3 mb-5 gap-4 w-100">
                {items.map((i) => (
                  <Fragment key={`${i.id}-${i.size}`}>
                    <CartItem item={i} />
                  </Fragment>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        {loading ? null : (
          <Col xs={12} md={4}>
            <Button
              className="mb-5"
              color="primary"
              role="button"
              onClick={() => navigate("/kasa")}
              style={{ width: "fit-content" }}
            >
              idź do kasy
            </Button>
            <Row className="gap-3">
              <OrderSummary
                numOfItems={totalItems}
                totalCost={totalCost}
                discount={discount}
                loading={loadingDiscount}
              />
              {!loadingDiscount && (
                <div>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="w-100">
                      <Input
                        placeholder="kod promocyjny"
                        onChange={(e) => setPromoCode(e.currentTarget.value)}
                        disabled={loadingDiscount}
                      />
                    </div>
                    <Button outline color="primary" onClick={validateCode}>
                      dodaj
                    </Button>
                  </div>
                  <span style={{ fontSize: "small" }}>{promoCodeText}</span>
                </div>
              )}
            </Row>
          </Col>
        )}
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default Cart;
