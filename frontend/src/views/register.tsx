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
import _ from "lodash";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(""); // eslint-disable-line
  const [showPassword, setShowPassword] = useState(false);

  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const validatePassword = (password?: string) => {
    const validPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*]{6,}$/;
    return password && validPasswordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      _.isEmpty(data.get("firstName")) ||
      _.isEmpty(data.get("lastName")) ||
      _.isEmpty(data.get("yearOfBirth")) ||
      _.isEmpty(data.get("password"))
    ) {
      setErrorMessage("podaj wszystkie wymagane dane");
      return;
    }
    // if (!validatePassword(data.get("password")?.toString())) {
    //   setErrorMessage(
    //     "password must have at least 6 characters, 1 uppercase letter and 1 number"
    //   );
    //   return;
    // }
    dispatch(
      register({
        password: data.get("password")?.toString(),
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        yearOfBirth: Number(data.get("yearOfBirth")),
        role: Role.USER,
      })
    );
  };

  const years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
  );

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
              <h1>pomyślna rejestracja</h1>
              <h3 className="d-block">teraz możesz się zalogować</h3>
              <Button
                className="mt-2"
                color="primary"
                onClick={() => navigate("/zaloguj")}
                style={{
                  width: "fit-content",
                  marginLeft: "12px",
                  marginTop: "12px",
                }}
              >
                zaloguj się
              </Button>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={12} md={8} xl={4}>
            <div style={{ textAlign: "center" }}>
              <h1>zarejestruj się</h1>
              <span className="fw-bolder">
                pamiętaj, aby podać <strong>prawdziwe</strong> dane!
              </span>
            </div>
            <Loader loading={status === "loading"}>
              <Form noValidate onSubmit={handleSubmit}>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>imię*</span>
                  <Input type="text" name="firstName" id="firstName" required />
                </FormGroup>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>nazwisko*</span>
                  <Input type="text" name="lastName" id="lastName" required />
                </FormGroup>
                <FormGroup>
                  <span style={{ fontSize: "small" }}>rok urodzenia*</span>
                  <Input
                    type="select"
                    name="yearOfBirth"
                    id="yearOfBirth"
                    required
                  >
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
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
                  {errorMessage && (
                    <span className="text-danger" style={{ fontSize: "small" }}>
                      {errorMessage}
                    </span>
                  )}
                </FormGroup>
                <Button className="my-3" type="submit" color="primary" block>
                  zarejestruj się
                </Button>
                <div style={{ textAlign: "right" }}>
                  <Link to="/zaloguj">
                    <span style={{ fontSize: "medium" }}>
                      masz już konto? zaloguj się
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
