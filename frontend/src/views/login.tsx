import React, { useEffect } from "react";
import {
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Form,
} from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../store/slices/accountSlice";
import { isAuthenticated } from "../utils/authentication";
import { IRootState, AppDispatch } from "../store/store";
import Loader from "../components/loader";

const Login = () => {
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(reset());
  }, []);

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
    );
  };

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" md="8" lg="4">
          <h1 style={{ textAlign: "center" }}>sign in</h1>
          <Loader type="spinner" loading={status === "loading"}>
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
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" name="remember" />
                <span style={{ fontSize: "medium" }}>remember me</span>
              </FormGroup>
              {status === "failed" && (
                <span className="text-danger" style={{ fontSize: "small" }}>
                  incorrect username or password. please try again.
                </span>
              )}
              <Button className="my-3" type="submit" color="primary" block>
                sign In
              </Button>
              <div style={{ textAlign: "right" }}>
                <Link to="/register">
                  <span style={{ fontSize: "medium" }}>
                    don't have an account? sign up"
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
