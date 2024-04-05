import React from "react";
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
import { login } from "../store/slices/accountSlice";
import { isAuthenticated } from "../utils/authentication";
import { IRootState, AppDispatch } from "../store/store";

const Login = () => {
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

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
          <h1 style={{ textAlign: "center" }}>Sign in</h1>
          {status}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Username*</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password*</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </FormGroup>
            <FormGroup check className="mb-3">
              <Label check>
                <Input type="checkbox" name="remember" /> Remember me
              </Label>
            </FormGroup>
            {status === "failed" && (
              <span className="text-danger">
                Incorrect username or password. Please try again.
              </span>
            )}
            <Button className="mb-3" type="submit" color="primary" block>
              Sign In
            </Button>
            <div style={{ textAlign: "right" }}>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
