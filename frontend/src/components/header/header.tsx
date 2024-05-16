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
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useState } from "react";
import InstructionsModal from "./instructionsModal";

const Header = (props: { basic?: boolean }) => {
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const cart = useSelector((state: IRootState) => state.cart.cart);

  return (
    <>
      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        onCloseCallback={() => setIsInstructionsModalOpen(false)}
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
                <NavLink href="/items/categories/women">women</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/items/categories/men">men</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/items/categories/kids">kids</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/sale">sale</NavLink>
              </NavItem>
            </Nav>
            <Nav className="align-items-center">
              <Button className="me-3"
                outline 
                color="primary"
                onClick={() => setIsInstructionsModalOpen(true)}
              >
                instructions
              </Button>

              <NavItem>
                <NavLink href="/cart" style={{ position: "relative" }}>
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
                <NavLink href={isAuthenticated() ? "/logout" : "/login"}>
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
            instructions
          </Button>
        )}
      </Navbar>
    </>
  );
};

export default Header;
