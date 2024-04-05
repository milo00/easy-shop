import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Role } from "../models/user";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/slices/accountSlice";
import { IRootState, AppDispatch } from "../store/store";

const Register = () => {
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      register({
        username: data.get("username")?.toString(),
        password: data.get("password")?.toString(),
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        role: Role.USER,
      })
    );
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" md="8" lg="4">
          <h1 style={{ textAlign: "center" }}>Sign up</h1>
          {status}
          <Form noValidate onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Firt name*</Label>
              <Input type="text" name="firstName" id="firstName" required />
            </FormGroup>
            <FormGroup>
              <Label>Last name*</Label>
              <Input type="text" name="lastName" id="lastName" required />
            </FormGroup>
            <FormGroup>
              <Label>Login*</Label>
              <Input type="text" name="username" id="username" required />
            </FormGroup>
            <FormGroup>
              <Label>Password*</Label>
              <Input type="password" name="password" id="password" required />
            </FormGroup>
            <Button className="mb-3" type="submit" color="primary" block>
              Sign Up
            </Button>
            <div style={{ textAlign: "right" }}>
              <Link to="/login">Already have an account? Sign in</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
