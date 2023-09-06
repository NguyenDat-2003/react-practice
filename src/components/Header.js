import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logoApp from "../assets/img/logo192.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { logout, user } = useContext(UserContext);

  const [hideHeader, setHideHeader] = useState();

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Log out success");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Logo"
            />

            <span>Managerment Users App</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && user.auth ? (
            <>
              <Nav className="me-auto">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manager Users
                </NavLink>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto"></Nav>
            </>
          )}

          <Nav>
            {user && user.email && (
              <span className="nav-link">Welcome {user.email}</span>
            )}
            <NavDropdown title="Setting">
              {user && user.auth === true ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavLink to="/login" className="dropdown-item">
                  Login
                </NavLink>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
