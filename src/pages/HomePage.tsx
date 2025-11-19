import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import './HomePage.css'
import NavigationComponent from "../components/Navigation";
import video from '../assets/foods-healthy.mp4'

export const HomePage: FC = () => {
  return (
    <>
      <NavigationComponent />
      <Container>
        <Row>
          <Col>
            <Container>
                <h1>dine4fit</h1>
                <p className="text-center">
                  Добро пожаловать в dine4fit! Здесь вы можете посчитать количество нутриентов в вашем блюде!
                </p>
            </Container>
          </Col>
          <Col>
            <Container>
              <video autoPlay loop controls width={500} className="object-fit-cover mh-100 rounded shadow"> 
                <source src={video} type="video/mp4"></source>
              </video>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};