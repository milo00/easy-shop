import { Col, Row, Input } from "reactstrap";
import IUser from "../../../models/user";

interface IAddressFormProps {
  user?: IUser;
}

const AddressForm = (props: IAddressFormProps) => {
  return (
    <Col>
      <Row className="gap-2">
        <Col xs={12} md={6}>
          <span style={{ fontSize: "small" }}>first name*</span>
          <Input
            type="text"
            name="firstName"
            required
            defaultValue={props.user?.firstName}
          />
        </Col>
        <Col>
          <span style={{ fontSize: "small" }}>last name*</span>
          <Input
            type="text"
            name="lastName"
            required
            defaultValue={props.user?.lastName}
          />
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
          <span style={{ fontSize: "small" }}>adress additional info</span>
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
  );
};

export default AddressForm;
