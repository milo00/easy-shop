import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Role } from "../models/user";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../store/slices/accountSlice";
import { IRootState, AppDispatch } from "../store/store";
import RegisterForm from "../components/registerForm";

const Register = () => {
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
      register({
        password: data.get("password")?.toString(),
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        yearOfBirth: Number(data.get("yearOfBirth")),
        role: Role.USER,
      })
    );
  };

  const navigateToLogin = () => {
    dispatch(reset());
    navigate("/zaloguj");
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
              <h1>pomyślna rejestracja</h1>
              <h3 className="d-block">teraz możesz się zalogować</h3>
              <Button
                className="mt-2"
                color="primary"
                onClick={navigateToLogin}
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
            <RegisterForm
              onSubmitCallback={handleSubmit}
              mainActionButtonText={"zarejestruj się"}
              otherActionText={"masz już konto? zaloguj się"}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Register;
