import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import RegisterForm from "../components/registerForm";
import { IRootState, AppDispatch } from "../store/store";
import { changePassword } from "../store/slices/accountSlice";

const ChangePassword = () => {
  const status = useSelector((state: IRootState) => state.account.status);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  

  // const validatePassword = (password?: string) => {
  //   const validPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*]{6,}$/;
  //   return password && validPasswordRegex.test(password);
  // };

  const handleSubmit = (data: FormData) => {
    // if (!validatePassword(data.get("password")?.toString())) {
    //   setErrorMessage(
    //     "password must have at least 6 characters, 1 uppercase letter and 1 number"
    //   );
    //   return;
    // }
    dispatch(
      changePassword({
        password: data.get("password")?.toString(),
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        yearOfBirth: Number(data.get("yearOfBirth")),
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
              <h1>pomyślnie zmieniono hasło</h1>
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
            <h1 style={{ textAlign: "center" }}>zmień hasło</h1>
            <RegisterForm
              newPassword
              onSubmitCallback={handleSubmit}
              mainActionButtonText={"zmień hasło"}
              otherActionText={"wróć do logowania"}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ChangePassword;
