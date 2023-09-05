import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink } from "react-router-dom";

import logoApp from "../assets/img/logo192.png";

function Header() {
  let location = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Logo"
          />
          <span>Managerment Users App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Manager Users
            </NavLink>
          </Nav>

          <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item className="dropdown-item">
                <NavLink to="/login">Login</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
