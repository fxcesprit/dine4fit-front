import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import app_logo from "../assets/app_logo.png"
import './Navigation.css'
import Nav from 'react-bootstrap/Nav';
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { Link, NavLink } from 'react-router-dom';


function NavigationComponent() {
  return (
      <Navbar className="header shadow mb-2">
          <Navbar.Brand as={Link} to={ROUTES.HOME} className='nav__img'>
            <img
              src={app_logo}
              width="40px"
              height="40px"
              className="d-inline-block"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav className='nav__links'>
            <Nav.Link as={NavLink} to={ROUTES.HOME}>{`${ROUTE_LABELS.HOME}`}</Nav.Link>
            <Nav.Link as={NavLink} to={ROUTES.NUTRIENTS}>{`${ROUTE_LABELS.NUTRIENTS}`}</Nav.Link>
          </Nav>
        <div className='nav__mobile-wrapper'
        onClick={(event) => event.currentTarget.classList.toggle('active')}
        >
          <div className='nav__mobile-target' />
          <div className='nav__mobile-menu'>
            <Nav.Link as={NavLink} to={ROUTES.HOME}>{`${ROUTE_LABELS.HOME}`}</Nav.Link>
            <Nav.Link as={NavLink} to={ROUTES.NUTRIENTS}>{`${ROUTE_LABELS.NUTRIENTS}`}</Nav.Link>
          </div>
        </div>
      </Navbar>
  );
}

export default NavigationComponent;