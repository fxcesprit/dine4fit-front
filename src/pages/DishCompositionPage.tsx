import "./DishCompositionPage.css"
import { FC } from 'react';
import { Col, Row, Image, Alert, Stack, Form, Container, Button } from "react-bootstrap";

import { ROUTES } from '../../Routes';
import { NutrientCard } from '../components/NutrientCard';
import Navigation from "../components/Navigation";
import { ROUTE_LABELS } from '../../Routes';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getDishCompositionRequest, } from '../slices/dishCompositionSlice';
import { DishCompositionNutrientCard } from "../components/DishCompositionNutrientCard";
import InputField from "../components/InputField";
import { deleteDishCompositionRequest, updateDishCompositionRequest, setDishCompositionRequest } from "../slices/dishCompositionSlice";

const DishCompositionPage: FC = () => {
  const { dishCompositionID } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    nutrients,
    dishCompositionRequest
  } = useSelector((state: RootState) => state.dishCompositionDraft);
  const isDraft = useSelector((state: RootState) => state.dishCompositionDraft.isDraft);

  useEffect(() => {
    if (dishCompositionID) {
      dispatch(getDishCompositionRequest(dishCompositionID));
    }
  }, [dispatch]);

  const handleCardClick = (id: number | undefined) => {
    navigate(`${ROUTES.NUTRIENTS}/${id}`);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dishCompositionID) {
      try {
        await dispatch(deleteDishCompositionRequest(dishCompositionID)).unwrap();
        navigate(ROUTES.NUTRIENTS);
      } catch {
        console.log('deleteDishCompositionRequest error')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setDishCompositionRequest({
            ...dishCompositionRequest,
            [name]: value,
        })
    );
  };

  const handleSaveDishCompositionRequest = () => {
    if (dishCompositionID) {
      const ToSend = {
        body_mass: dishCompositionRequest.body_mass ?? 0,
        dish_mass: dishCompositionRequest.dish_mass ?? 0,
        dish: dishCompositionRequest.dish ?? ''
      };
      try {
        dispatch(updateDishCompositionRequest({ dishCompositionID: dishCompositionID, dishCompositionRequest: ToSend }));
      } catch (error) {
        console.log("updateDishCompositionRequest error")
      }
    }
  }

  return (
    <>
      <Navigation />
      <div className="">
        {(!isDraft) ? (
          <>
          <h4>
            Масса блюда: {dishCompositionRequest.dish_mass}
          </h4>
          <h4>
            Масса тела: {dishCompositionRequest.body_mass}
          </h4>
          <h4>
            Блюдо: {dishCompositionRequest.dish}
          </h4>
          </>
        ) : 
        (
          <Form className="w-50 mx-auto" >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Масса блюда:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="dish-composition-form-control"               
                value={dishCompositionRequest.dish_mass as string}
                placeholder="масса блюда..." 
              />
            </Col>
          </Form.Group>
                    <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Масса тела:
            </Form.Label>
            <Col sm="10">
              <Form.Control               
                value={dishCompositionRequest.body_mass as string}
                placeholder="Масса тела..." 
              />
            </Col>
          </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Блюдо:
            </Form.Label>
            <Col sm="10">
              <Form.Control               
                value={dishCompositionRequest.dish as string}
                placeholder="Блюдо..." 
              />
            </Col>
          </Form.Group>
        </Form>
        )}
          <h1>Нутриенты:</h1>
          <div className="cards-wrapper-2 d-flex flex-column">
            {nutrients.length ? (
              nutrients.map((item) => (
                <Col key={item.nutrient?.id}>
                  <DishCompositionNutrientCard
                    
                    name={item.nutrient?.name}
                    img_url={item.nutrient?.img_url}
                    nutrientId={item.nutrient?.id}
                    quantity_in_dish={item.quantity_in_dish}
                    daily_dose_percentage={item.daily_dose_percentage}
                  />
                </Col>
              ))
            ) : (
              <section className="nutrients-not-found">
                <h1>К сожалению, пока ничего не найдено :(</h1>
              </section>
            )}
            {(isDraft) && (
              <>
              <Button className="save-button" onClick={handleDelete}>
                Удалить
              </Button>
              <Button type="submit" className="save-button" onClick={handleSaveDishCompositionRequest}>
                Сохранить
              </Button>
              </>
            )}
          </div>
      </div>
    </>
  );
};

export default DishCompositionPage;