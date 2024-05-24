import React, { useEffect, useState } from "react";
import {
  Container,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/accountSlice";
import { isAuthenticated } from "../utils/authentication";
import { IRootState, AppDispatch } from "../store/store";
import Loader from "../components/loader/loader";
import { sendBatch } from "../store/slices/userIrritationTimeSlice";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    status === "unauthenticated" &&
      setErrorMessage("niepoprawne dane, spróbuj ponownie");
  }, [status]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      _.isEmpty(data.get("firstName")) ||
      _.isEmpty(data.get("lastName")) ||
      _.isEmpty(data.get("password"))
    ) {
      setErrorMessage("podaj wszystkie wymagane dane");
      return;
    }
    dispatch(
      login({
        user: {
          firstName: data.get("firstName")?.toString(),
          lastName: data.get("lastName")?.toString(),
          password: data.get("password")?.toString(),
        },
        rememberMe: !!data.get("remember"),
      })
    ).then(() => {
      dispatch(sendBatch());
    });
  };

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" md="8" lg="4">
          <h1 style={{ textAlign: "center" }}>zaloguj się</h1>
          <Loader loading={status === "loading"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <span style={{ fontSize: "small" }}>imię*</span>
                <Input type="text" name="firstName" id="firstName" required />
              </FormGroup>
              <FormGroup>
                <span style={{ fontSize: "small" }}>nazwisko*</span>
                <Input type="text" name="lastName" id="lastName" required />
              </FormGroup>
              <FormGroup>
                <span style={{ fontSize: "small" }}>hasło*</span>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                  />
                  <InputGroupText
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <FontAwesomeIcon
                      color="primary"
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" name="remember" />
                <span style={{ fontSize: "medium" }}>pamiętaj mnie</span>
              </FormGroup>
              {errorMessage && (
                <span className="text-danger" style={{ fontSize: "small" }}>
                  {errorMessage}
                </span>
              )}
              <Button className="my-3" type="submit" color="primary" block>
                zaloguj się
              </Button>
              <div style={{ textAlign: "right" }}>
                <Link to="/zarejestruj">
                  <span style={{ fontSize: "medium" }}>
                    nie masz konta? zarejestruj się
                  </span>
                </Link>
              </div>
            </Form>
          </Loader>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
