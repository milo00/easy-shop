import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
} from "reactstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../utils/authentication";

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <img src={logo} alt="Logo" style={{ maxHeight: "50px" }} />
      </NavbarBrand>
      <Nav className="me-auto">
        <NavItem>
          <NavLink href="/women">Kobiety</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/men">Mężczyźni</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/kids">Dzieci</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sale">Wyprzedaż</NavLink>
        </NavItem>
      </Nav>
      <Nav className="align-items-center">
        <NavItem className="me-3">
          <Input placeholder="Szukaj..." />
        </NavItem>
        <NavItem>
          <Button color="link">
            <FontAwesomeIcon icon={faCartShopping} />
          </Button>
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
