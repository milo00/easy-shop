import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Container className="mx-0 mt-5" fluid>
      <Row>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={1}>
          <span className="text-primary" style={{ fontSize: "12rem" }}>
            {":("}
          </span>
        </Col>
        <Col>
          <Row>
            <h1>Twój koszyk jest pusty</h1>
            <h3>czas go zapełnić!</h3>
            <Button
              color="primary"
              role="button"
              onClick={() => navigate("/")}
              style={{
                width: "fit-content",
                marginLeft: "12px",
                marginTop: "12px",
              }}
            >
              zaczynajmy
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyCart;
