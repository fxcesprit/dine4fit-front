import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import './HomePage.css'

export const HomePage: FC = () => {
  return (
    <Container>
          <h1>dine4fit</h1>
          <p>
            Добро пожаловать в dine4fit! Здесь вы можете посчитать количество нутриентов в вашем блюде!
          </p>
          <Link to={ROUTES.NUTRIENTS}>
            <Button>Просмотреть нутриенты</Button>
          </Link>
    </Container>
  );
};