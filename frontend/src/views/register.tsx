import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../models/user";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/slices/accountSlice";
import { IRootState, AppDispatch } from "../store/store";
import Loader from "../components/loader/loader";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validatePassword = (password?: string) => {
    const validPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*]{6,}$/;
    return password && validPasswordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validatePassword(data.get("password")?.toString())) {
      setErrorMessage(
        "password must have at least 6 characters, 1 uppercase letter and 1 number"
      );
      return;
    }
    dispatch(
      register({
        username: data.get("email")?.toString(),
        password: data.get("password")?.toString(),
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        role: Role.USER,
      })
    );
  };

  return (
    <Container>
      {status === "succeeded" ? (
        <Row>
          <Col xs={0} md={2}></Col>
          <Col xs={12} md={1}>
            <span className="text-primary" style={{ fontSize: "12rem" }}>
              {":)"}
            </span>
          </Col>
          <Col>
            <Row>
              <h1>succesfully signed up</h1>
              <h3 className="d-block">now You are ready to sign in</h3>
              <Button
                className="mt-2"
                color="primary"
                onClick={() => navigate("/login")}
                style={{
                  width: "fit-content",
                  marginLeft: "12px",
                  marginTop: "12px",
                }}
              >
                sign in
              </Button>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={12} md={8} xl={4}>
            <h1 style={{ textAlign: "center" }}>sign up</h1>
            <Loader loading={status === "loading"}>
              <Form noValidate onSubmit={handleSubmit}>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>firt name*</span>
                  <Input type="text" name="firstName" id="firstName" required />
                </FormGroup>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>last name*</span>
                  <Input type="text" name="lastName" id="lastName" required />
                </FormGroup>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>email*</span>
                  <Input type="email" name="email" id="email" required />
                  {status === "failed" ? (
                    <span className="text-danger" style={{ fontSize: "small" }}>
                      this email is already in use
                    </span>
                  ) : null}
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
                {errorMessage && (
                  <span className="text-danger" style={{ fontSize: "small" }}>
                    {errorMessage}
                  </span>
                )}
                <Button className="mb-3" type="submit" color="primary" block>
                  sign up
                </Button>
                <div style={{ textAlign: "right" }}>
                  <Link to="/login">
                    <span style={{ fontSize: "medium" }}>
                      already have an account? sign in
                    </span>
                  </Link>
                </div>
              </Form>
            </Loader>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Register;
