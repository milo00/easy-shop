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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../utils/authentication";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";

const Header = () => {
  const cart = useSelector((state: IRootState) => state.cart.cart);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <img src={logo} alt="Logo" style={{ maxHeight: "50px" }} />
      </NavbarBrand>
      <Nav className="me-auto">
        <NavItem>
          <NavLink href="/women">Women</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/men">Men</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/kids">Kids</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sale">Sale</NavLink>
        </NavItem>
      </Nav>
      <Nav className="align-items-center">
        <NavItem className="me-3">
          <Input placeholder="Search..." />
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
    </Navbar>
  );
};

export default Header;
