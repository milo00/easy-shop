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

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <img src={logo} alt="Logo" style={{ maxHeight: "50px" }} />
      </NavbarBrand>
      <Nav className="me-auto">
        <NavItem>
          <NavLink href="/login">Kobiety</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Mężczyźni</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Dzieci</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Wyprzedaż</NavLink>
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
          <Button color="link">
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
