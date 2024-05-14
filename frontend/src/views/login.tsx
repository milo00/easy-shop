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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    status === "unauthenticated" &&
      setErrorMessage("incorrect username or password. please try again");
  }, [status]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        user: {
          username: data.get("username")?.toString(),
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
          <h1 style={{ textAlign: "center" }}>sign in</h1>
          <Loader loading={status === "loading"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <span style={{ fontSize: "small" }}>username*</span>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                />
              </FormGroup>
              <FormGroup>
                <span style={{ fontSize: "small" }}>password*</span>
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
                <span style={{ fontSize: "medium" }}>remember me</span>
              </FormGroup>
              {errorMessage && (
                <span className="text-danger" style={{ fontSize: "small" }}>
                  {errorMessage}
                </span>
              )}
              <Button className="my-3" type="submit" color="primary" block>
                sign In
              </Button>
              <div style={{ textAlign: "right" }}>
                <Link to="/register">
                  <span style={{ fontSize: "medium" }}>
                    don't have an account? sign up
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
