import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import logoApp from "../assets/img/logo192.png";
import { toast } from "react-toastify";

function Header() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Log out success");
  };

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
            <NavDropdown title="Setting">
              <NavLink to="/login" className="dropdown-item">
                Login
              </NavLink>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
