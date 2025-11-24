import Navbar from 'react-bootstrap/Navbar';
import app_logo from "../assets/app_logo.png"
import './Navigation.css'
import Nav from 'react-bootstrap/Nav';
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../store/store';
import { logoutUserAsync } from '../slices/userSlice'; 
import { setFilterNameAction, getNutrientsByName } from '../slices/nutrientSlice'; 
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

function NavigationComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.user.email); // получение значения username из стора

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // получение из стора значения флага состояния приложения

  // Обработчик события нажатия на кнопку "Выйти"
  const handleExit = async ()  => {
      await dispatch(logoutUserAsync());
      dispatch(setFilterNameAction('')); // можно реализовать в `extrareducers` у функции logoutUserAsynс
      navigate(ROUTES.NUTRIENTS); // переход на страницу списка услуг
      await dispatch(getNutrientsByName()); // для показа очищения поля поиска
  }

  return (
      <Navbar className="header shadow mb-2 hstack gap-3">
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

          {(isAuthenticated == false ) && (
            <div className="ms-auto">
              <Link to={ROUTES.LOGIN}>
                  <Button className="login-btn ms-auto">Войти</Button>
              </Link>
            </div>
          )}

        
          {(isAuthenticated == true) && (
            <div className="ms-auto">
              <Button variant="primary" type="submit" className="login-btn" onClick={ handleExit }>
                  Выйти
              </Button>
            </div>
          )}
          
          <Nav.Link as={NavLink} to={ROUTES.HOME}>{ email }</Nav.Link>     
      </Navbar>
  );
}

export default NavigationComponent;