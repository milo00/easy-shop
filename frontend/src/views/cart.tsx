import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/checkout/cartItem";
import { Button, Col, Container, Row } from "reactstrap";
import { clear } from "../store/slices/cartSlice";
import EmptyCart from "./emptyCart";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/checkout/orderSummary";
import useCartItems from "../utils/hooks/useCartItems";
import { IRootState } from "../store/store";
import Loader from "../components/loader";
import { Fragment } from "react/jsx-runtime";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: IRootState) => state.cart.cart);
  const { items, loading, totalCost, totalItems } = useCartItems();

  if (cartItems.items.length === 0) {
    return <EmptyCart />;
  }

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
              <Loader loading={loading} type={"spinner"}>
                <Row style={{ fontSize: "smaller" }}>
                  <span>{`in total (${totalItems} items): ${totalCost} PLN`}</span>
                  <span>
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
              <OrderSummary numOfItems={totalItems} totalCost={totalCost} />
            </Row>
          </Col>
        )}
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default Cart;
