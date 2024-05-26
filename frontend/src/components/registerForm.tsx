import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Form,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import Loader from "./loader/loader";
import _ from "lodash";
import { reset } from "../store/slices/accountSlice";

interface IRegisterFormProps {
  onSubmitCallback: (data: FormData) => void;
  mainActionButtonText: string;
  otherActionText: string;
  newPassword?: boolean;
}

const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
);

const RegisterForm = (props: IRegisterFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage("");
  }, []);

  useEffect(() => {
    status === "unauthenticated" &&
      setErrorMessage("niepoprawne dane, spróbuj ponownie");
  }, [status]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    props.onSubmitCallback(data);
  };

  return (
    <Loader loading={status === "loading"}>
      <Form noValidate onSubmit={onSubmit}>
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
          <Input type="select" name="yearOfBirth" id="yearOfBirth" required>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <span style={{ fontSize: "small" }}>
            {props.newPassword ? "nowe " : ""}hasło*
          </span>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
            />
            <InputGroupText onClick={() => setShowPassword((prev) => !prev)}>
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
          {props.mainActionButtonText}
        </Button>
        <div style={{ textAlign: "right" }}>
          <Link to="/zaloguj" onClick={() => dispatch(reset())}>
            <span style={{ fontSize: "medium" }}>{props.otherActionText}</span>
          </Link>
        </div>
      </Form>
    </Loader>
  );
};

export default RegisterForm;
