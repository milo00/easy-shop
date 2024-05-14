import React, { useState } from "react";
import { Row, Col, Input } from "reactstrap";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");

  const formatCardNumber = (input: string) => {
    let formattedInput = input.replace(/\D/g, "");

    formattedInput = formattedInput.replace(/(\d{4})/g, "$1 ").trim();

    return formattedInput;
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setCardNumber(formatCardNumber(input));
  };

  const formatExpiryDate = (input: string) => {
    let formattedInput = input.replace(/\D/g, "");

    if (formattedInput.length > 2) {
      formattedInput =
        formattedInput.slice(0, 2) + "/" + formattedInput.slice(2);
    }

    return formattedInput;
  };

  const handleExpiryDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setExpiryDate(formatExpiryDate(input));
  };

  return (
    <>
      <Row>
        <Col>
          <span style={{ fontSize: "small" }}>card number*</span>
          <Input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            maxLength={19}
            minLength={19}
            placeholder="---- ---- ---- ----"
            required
            onChange={(e) => handleCardNumberChange(e)}
          />
        </Col>
      </Row>
      <Row className="gap-2">
        <Col xs={12} md={6}>
          <span style={{ fontSize: "small" }}>expiration date*</span>
          <Input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            maxLength={5}
            minLength={5}
            placeholder="MM/YY"
            required
            onChange={(e) => handleExpiryDateChange(e)}
          />
        </Col>
        <Col>
          <span style={{ fontSize: "small" }}>CVV*</span>
          <Input
            type="text"
            id="cvc"
            name="cvc"
            value={cvc}
            maxLength={3}
            minLength={3}
            required
            onChange={(e) =>
              e.target.value.length < 4 && setCvc(e.target.value)
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default CreditCardForm;
