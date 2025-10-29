import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import app_logo from "../assets/app_logo.png"
import './Navigation.css'
import Nav from 'react-bootstrap/Nav';
import { ROUTES, ROUTE_LABELS } from "../../Routes";


function NavigationComponent() {
  return (
      <Navbar className="header shadow mb-2" expand="lg">
        <Container className='d-flex flex-row'>
          <Navbar.Brand href={`${ROUTES.NUTRIENTS}`}>
            <img
              src={app_logo}
              width="40px"
              height="40px"
              className="d-inline-block"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href={`${ROUTES.HOME}`}>{`${ROUTE_LABELS.HOME}`}</Nav.Link>
            <Nav.Link href={`${ROUTES.NUTRIENTS}`}>{`${ROUTE_LABELS.NUTRIENTS}`}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavigationComponent;