import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const logoDark =
  'client/src/assets/Logo/linear/dark/transparent-background/fec-linear-logo.png';
const logoLight =
  'client/src/assets/Logo/linear/white/transparent-background/fec-linear-logo.png';

const Logo = (theme) => (
  <img src={theme === 'light' ? logoLight : logoDark} alt="Logo" />
);

const NavBar = ({ theme = 'light' }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Logo theme={theme} /> My Brand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  color: PropTypes.string,
};

export default NavBar;
