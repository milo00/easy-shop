import { Container, Row, Col, Input } from "reactstrap";
import OrderSummary from "../components/checkout/orderSummary";
import useCartItems from "../utils/hooks/useCartItems";
import CheckoutItem from "../components/checkout/checkoutItem";
import { ReactNode, useState } from "react";
import CheckoutFormElement from "../components/checkout/checkoutFormElement";
import CheckoutCollapse from "../components/checkout/checkoutCollapse";
import Loader from "../components/loader";

const Checkout = () => {
  const [submittedForms, setSubmittedForms] = useState<boolean[]>([]);
  const { items, totalCost, loading } = useCartItems();

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
    }

    if (element) {
      let newValidForm = [...submittedForms];
      newValidForm[index] = true;
      setSubmittedForms(newValidForm);
    }

    return element;
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
              <span style={{ fontSize: "small" }}>e-mail</span>
              <Input type="email" name="email" />
            </CheckoutFormElement>
            <CheckoutFormElement
              isOpen={submittedForms[0]}
              wasSubmitted={submittedForms[1]}
              header={"address"}
              onSubmitCallback={(data: FormData) => onSubmitCallback(data, 1)}
              onResetCallback={() => onReset(1)}
            >
              <Col>
                <Row className="gap-2">
                  <Col xs={12} md={6}>
                    <span style={{ fontSize: "small" }}>first name*</span>
                    <Input type="text" name="firstName" required />
                  </Col>
                  <Col>
                    <span style={{ fontSize: "small" }}>last name*</span>
                    <Input type="text" name="lastName" required />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{ fontSize: "small" }}>adress*</span>
                    <Input type="text" name="adress" required />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{ fontSize: "small" }}>
                      adress additional info
                    </span>
                    <Input type="text" name="adressAdditional" />
                  </Col>
                </Row>
                <Row className="gap-2">
                  <Col xs={12} md={6}>
                    <span style={{ fontSize: "small" }}>postal code*</span>
                    <Input
                      type="text"
                      name="postCode"
                      required
                      pattern="[0-9]{2}-[0-9]{3}"
                    />
                  </Col>
                  <Col>
                    <span style={{ fontSize: "small" }}>city*</span>
                    <Input type="text" name="city" required />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{ fontSize: "small" }}>phone number*</span>
                    <Input type="tel" name="tel" required />
                  </Col>
                  <Col xs={12} md={6} />
                </Row>
              </Col>
            </CheckoutFormElement>
            <CheckoutCollapse
              isOpen={submittedForms[1]}
              header={"payment"}
            ></CheckoutCollapse>
          </Row>
        </Col>
        <Col xs={0} md={1}></Col>
        <Col xs={12} md={4}>
          <Row className="gap-3">
            <OrderSummary numOfItems={items.length} totalCost={totalCost} />
            <div className="border border-bottom my-2" />
            <div className="d-flex justify-content-center">
              <Loader loading={loading} basic>
                {items.map((i) => (
                  <CheckoutItem item={i} />
                ))}
              </Loader>
            </div>
          </Row>
        </Col>
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default Checkout;
