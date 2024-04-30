import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

interface IErrorProps {
  message: string;
}

const Error = (props: IErrorProps) => {
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
            <h1>ooops!</h1>
            <h2>something went wrong</h2>
            <h3>{props.message}</h3>
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
              go back to homepage
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
