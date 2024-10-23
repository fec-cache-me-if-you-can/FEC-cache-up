import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoDark from '@/assets/Logo/linear/dark/transparent-background/fec-linear-logo.png';
import logoLight from '@/assets/Logo/linear/white/transparent-background/fec-linear-logo.png';
import PrimaryButton from '@/components/PrimaryButton.jsx';
import Icon from '@/components/icons.jsx';

const Logo = ({ theme }) => (
  <img
    src={theme === 'light' ? logoDark : logoLight}
    alt="Logo"
    style={{ height: '60px' }}
  />
);

Logo.propTypes = {
  theme: PropTypes.string,
};

const NavBar = ({ theme, toggleTheme }) => {
  return (
    <Navbar expand="lg" className="secondary-bg  mb-5 ">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 justify-content-between align-items-center fs-6 py-5 px-5 text-primary bg-secondary">
          <Navbar.Brand href="#home" className="mx-3">
            <Logo theme={theme} />
          </Navbar.Brand>
          <div className="d-flex justify-content-end align-content-center gap-4 align-items-center">
            <Nav.Link
              href="#product-details"
              className="hover-scale hover-underline"
            >
              PRODUCT DETAILS
            </Nav.Link>
            <Nav.Link href="#reviews" className="hover-scale hover-underline">
              REVIEWS
            </Nav.Link>
            <Nav.Link href="#q-a" className="hover-scale hover-underline">
              Q&A
            </Nav.Link>
            <Nav.Link
              href="#related-products"
              className="hover-scale hover-underline"
            >
              RELATED PRODUCTS
            </Nav.Link>
            <button
              onClick={toggleTheme}
              className={`btn btn-primary square m-3 pe-1 ps-1 text-primary bg-main`}
              style={{ minWidth: '40px', minHeight: '40px', padding: '0' }}
              aria-label={`toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              <Icon icon={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} />
            </button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
};

export default NavBar;
