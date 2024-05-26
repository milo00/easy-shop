import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { IRootState } from "../store/store";
import { reset as resetAccountError } from "../store/slices/accountSlice";
import { resetError as resetItemsError } from "../store/slices/itemsSlice";
import { resetError as resetIrritationTimeError } from "../store/slices/userIrritationTimeSlice";

interface IErrorProps {
  message?: string;
}

const Error = (props: IErrorProps) => {
  const accountError =
    useSelector((state: IRootState) => state.account.status) === "failed";
  const itemsError =
    useSelector((state: IRootState) => state.items.status) === "failed";
  const userIrritationTimeError =
    useSelector((state: IRootState) => state.userIrritationTime.status) ===
    "failed";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGoBackToHomePage = () => {
    navigate("/");

    accountError && dispatch(resetAccountError());
    itemsError && dispatch(resetItemsError());
    userIrritationTimeError && dispatch(resetIrritationTimeError());
  };

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
            <h2>coś poszło nie tak</h2>
            <h3>{props.message}</h3>
            <Button
              color="primary"
              role="button"
              onClick={onGoBackToHomePage}
              style={{
                width: "fit-content",
                marginLeft: "12px",
                marginTop: "12px",
              }}
            >
              powróć na stronę główną
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
