import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoDark from '@/assets/Logo/linear/dark/transparent-background/fec-linear-logo.png';
import logoLight from '@/assets/Logo/linear/white/transparent-background/fec-linear-logo.png';
import Icon from '@/components/icons.jsx';

const Logo = React.memo(({ theme }) => (
  <img
    src={theme === 'light' ? logoDark : logoLight}
    alt="Company Logo"
    className="logo-image"
    style={{ height: '60px', width: 'auto' }}
  />
));

Logo.displayName = 'Logo';
Logo.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

const NavBar = ({ theme, toggleTheme }) => (
  <header>
    <Navbar
      expand="lg"
      className="bg-secondary mb-5 border-bottom border-bottom-thick border-primary"
      role="navigation"
      aria-label="Main Navigation"
    >
      <Container fluid className="p-5 flex-nowrap">
        <Navbar.Brand href="#home" className="ms-4 mx-lg-0 mx-auto px-3">
          <Logo theme={theme} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 shadow-none p-0"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center fs-5 fw-medium py-3 d-flex align-items-center">
            <Nav.Link
              href="#product-details"
              className="hover-scale hover-underline my-2"
              role="link"
              aria-label="Product Details"
            >
              PRODUCT DETAILS
            </Nav.Link>
            <Nav.Link
              href="#reviews"
              className="hover-scale hover-underline my-3"
              role="link"
              aria-label="Reviews"
            >
              REVIEWS
            </Nav.Link>
            <Nav.Link
              href="#q-a"
              className="hover-scale hover-underline my-2"
              role="link"
              aria-label="Questions and Answers"
            >
              Q&A
            </Nav.Link>
            <Nav.Link
              href="#related-products"
              className="hover-scale hover-underline my-2"
              role="link"
              aria-label="Related Products"
            >
              RELATED PRODUCTS
            </Nav.Link>
            <button
              onClick={toggleTheme}
              className="btn btn-primary square m-3 pe-1 ps-1 text-primary bg-main me-4"
              style={{ minWidth: '40px', minHeight: '40px', padding: '0' }}
              aria-label={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              tabIndex="0"
            >
              <Icon icon={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} />
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

NavBar.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default NavBar;
