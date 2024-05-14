import { Container, Row, Col, Button } from "reactstrap";
import OrderSummary from "../components/checkout/orderSummary";
import useCartItems from "../utils/hooks/useCartItems";
import CheckoutItem from "../components/checkout/checkoutItem";
import { ReactNode, useEffect, useState } from "react";
import CheckoutFormElement from "../components/checkout/checkoutFormElement";
import { DISCOUNT_PERCENT_TOKEN } from "./cart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store/store";
import { fetchById } from "../store/slices/accountSlice";
import CreditCardForm from "../components/checkout/forms/creditCardForm";
import { clear } from "../store/slices/cartSlice";
import ContactForm from "../components/checkout/forms/contactForm";
import AddressForm from "../components/checkout/forms/addressForm";

const Checkout = () => {
  const [wasBought, setWasBought] = useState(false);
  const [submittedForms, setSubmittedForms] = useState<boolean[]>([]);
  const user = useSelector((state: IRootState) => state.account.user);

  const { items, totalCost } = useCartItems();
  const discount = sessionStorage.getItem(DISCOUNT_PERCENT_TOKEN);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchById());
  }, [dispatch]);

  const onReset = (index: number) => {
    let newValidForm = [...submittedForms];
    newValidForm[index] = false;
    setSubmittedForms(newValidForm);
  };

  const onSubmitCallback = (data: FormData, index: number): ReactNode => {
    let element: ReactNode = null;
    switch (index) {
      case 0:
        element = getContactFormData(data);
        break;
      case 1:
        element = getAdressFormData(data);
        break;
      case 2:
        element = getCardData(data);
    }

    if (element) {
      let newValidForm = [...submittedForms];
      newValidForm[index] = true;
      setSubmittedForms(newValidForm);
    }

    return element;
  };

  const getCardData = (data: FormData) => {
    const cardNumber = data.get("cardNumber")?.toString();
    const expiryDate = data.get("expiryDate")?.toString();
    const cvc = data.get("cvc")?.toString();
    return (
      <>
        <div>{cardNumber}</div>
        <div>
          {expiryDate} {cvc}
        </div>
      </>
    );
  };

  const getContactFormData = (data: FormData) => {
    const email = data.get("email")?.toString();
    return (email && <span>{email}</span>) ?? null;
  };

  const getAdressFormData = (data: FormData) => {
    const firstName = data.get("firstName")?.toString();
    const lastName = data.get("lastName")?.toString();
    const adress = data.get("adress")?.toString();
    const adressAdditional = data.get("adressAdditional")?.toString();
    const postCode = data.get("postCode")?.toString();
    const city = data.get("city")?.toString();
    const tel = data.get("tel")?.toString();

    return (
      <>
        <div>
          {firstName} {lastName}
        </div>
        <div>{adress}</div>
        {adressAdditional ? <span>{adressAdditional}</span> : null}
        <div>
          {postCode} {city}
        </div>
        <div>{tel}</div>
      </>
    );
  };

  const onBuy = () => {
    dispatch(clear());
    setWasBought(true);
  };

  if (wasBought)
    return (
      <Container>
        <Row style={{ marginTop: "80px", alignItems: "flex-start" }}>
          <h1>thank You so much for participating in my research</h1>
          <h4>now it is time for a short questionaire :)</h4>
          <Button
            color="primary"
            onClick={() =>
              window.open(
                "https://www.google.pl/intl/pl/forms/about/",
                "_blank"
              )
            }
            style={{
              width: "auto",
              marginLeft: "0.75rem",
              marginTop: "0.75rem",
            }}
          >
            go to questionaire
          </Button>
        </Row>
      </Container>
    );

  return (
    <Container className="mx-0 mt-5" fluid>
      <Row>
        <Col xs={0} md={1}></Col>
        <Col>
          <Row className="justify-content-between">
            <h1 className="w-auto">ORDER DETAILS</h1>
          </Row>
          <Row className="py-3 mt-3 mb-5 gap-4">
            <CheckoutFormElement
              isOpen={!submittedForms[0]}
              wasSubmitted={submittedForms[0]}
              header={"contact"}
              onSubmitCallback={(data: FormData) => onSubmitCallback(data, 0)}
              onResetCallback={() => onReset(0)}
            >
              <ContactForm />
            </CheckoutFormElement>
            <CheckoutFormElement
              isOpen={submittedForms[0]}
              wasSubmitted={submittedForms[1]}
              header={"address"}
              onSubmitCallback={(data: FormData) => onSubmitCallback(data, 1)}
              onResetCallback={() => onReset(1)}
            >
              <AddressForm user={user} />
            </CheckoutFormElement>
            <CheckoutFormElement
              isOpen={submittedForms[1]}
              header={"payment"}
              onSubmitCallback={(data: FormData) => onSubmitCallback(data, 2)}
              onResetCallback={() => onReset(2)}
              wasSubmitted={submittedForms[2]}
            >
              <CreditCardForm />
            </CheckoutFormElement>
            {submittedForms[0] && submittedForms[1] && submittedForms[2] && (
              <Row>
                <Col>
                  <Button color="primary" onClick={onBuy}>
                    buy
                  </Button>
                </Col>
              </Row>
            )}
          </Row>
        </Col>
        <Col xs={0} md={1}></Col>
        <Col xs={12} md={4}>
          <Row className="gap-3">
            <OrderSummary
              numOfItems={items.length}
              totalCost={totalCost}
              discount={Number(discount)}
            />
            <div className="border border-bottom my-2" />
            {items.length ? (
              <div className="d-flex align-items-center flex-column">
                {items.map((i) => (
                  <CheckoutItem key={i.id} item={i} />
                ))}
              </div>
            ) : null}
          </Row>
        </Col>
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default Checkout;
