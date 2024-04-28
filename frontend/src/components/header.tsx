import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Badge,
} from "reactstrap";
import logo from "../assets/logo.png";
import logoIcon from "../assets/logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../utils/authentication";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";

const Header = (props: { basic?: boolean }) => {
  const cart = useSelector((state: IRootState) => state.cart.cart);

  return (
    <Navbar
      light
      expand="md"
      style={{
        fontWeight: "bolder",
      }}
    >
      <NavbarBrand href="/">
        <img
          src={props.basic ? logoIcon : logo}
          alt="Logo"
          style={{ maxHeight: "50px" }}
        />
      </NavbarBrand>

      {!props.basic ? (
        <>
          <Nav className="me-auto">
            <NavItem>
              <NavLink href="/women">women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/men">men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/kids">kids</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/sale">sale</NavLink>
            </NavItem>
          </Nav>
          <Nav className="align-items-center">
            <NavItem className="me-3">
              <Input placeholder="search..." />
            </NavItem>

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
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </NavItem>
          </Nav>
        </>
      ) : null}
    </Navbar>
  );
};

export default Header;
