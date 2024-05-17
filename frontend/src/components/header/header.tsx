import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../../utils/authentication";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store/store";
import { useEffect, useState } from "react";
import InstructionsModal from "./instructionsModal";
import { fetchLoggedIn } from "../../store/slices/accountSlice";

const Header = (props: { basic?: boolean }) => {
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const cart = useSelector((state: IRootState) => state.cart.cart);
  const user = useSelector((state: IRootState) => state.account.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated() && !user?.firstName) {
      dispatch(fetchLoggedIn());
    }
  }, [user, dispatch]);

  return (
    <>
      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        toggle={() => setIsInstructionsModalOpen((prev) => !prev)}
      />
      <Navbar
        light
        expand="md"
        style={{
          fontWeight: "bolder",
        }}
      >
        <NavbarBrand href="/">
          <img
            src={
              props.basic
                ? `${process.env.PUBLIC_URL}/assets/logo-icon.png`
                : `${process.env.PUBLIC_URL}/assets/logo.png`
            }
            alt="Logo"
            style={{ maxHeight: "50px" }}
          />
        </NavbarBrand>

        {!props.basic ? (
          <>
            <Nav className="me-auto">
              <NavItem>
                <NavLink href="/produkty/kategorie/kobiety">kobiety</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/produkty/kategorie/mężczyźni">
                  mężczyźni
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/produkty/kategorie/kids">dzieci</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/wyprzedaż">wyprzedaż</NavLink>
              </NavItem>
            </Nav>
            <Nav className="align-items-center">
              <Button
                className="me-3"
                outline
                color="primary"
                onClick={() => setIsInstructionsModalOpen(true)}
              >
                instrukcje
              </Button>

              {user?.firstName && (
                <span className="fw-light mx-2">cześć, {user?.firstName}!</span>
              )}

              <NavItem>
                <NavLink href="/koszyk" style={{ position: "relative" }}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cart.items?.length ? (
                    <Badge
                      pill
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        right: "6px",
                        fontSize: "xx-small",
                      }}
                    >
                      {cart.items.length}
                    </Badge>
                  ) : null}
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={isAuthenticated() ? "/wyloguj" : "/zaloguj"}>
                  <FontAwesomeIcon
                    icon={isAuthenticated() ? faArrowRightFromBracket : faUser}
                  />
                </NavLink>
              </NavItem>
            </Nav>
          </>
        ) : (
          <Button
            outline
            color="primary"
            onClick={() => setIsInstructionsModalOpen(true)}
          >
            instrukcje
          </Button>
        )}
      </Navbar>
    </>
  );
};

export default Header;
