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
import { deleteDishCompositionRequest, submitDishCompositionRequest, setDishCompositionRequest, saveDishCompositionRequest } from "../slices/dishCompositionSlice";

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

  const handleSaveDishCompositionRequest = async () => {
      if (dishCompositionID) {
      const ToSend = {
        body_mass: dishCompositionRequest.body_mass ?? 0,
        dish_mass: dishCompositionRequest.dish_mass ?? 0,
        dish: dishCompositionRequest.dish ?? ''
      };
      try {
        dispatch(saveDishCompositionRequest({ dishCompositionID: dishCompositionID, dishCompositionRequest: ToSend }));
        navigate(`${ROUTES.DISHCOMPOSITIONLIST}`);
      } catch (error) {
        console.log("submitDishCompositionRequest error")
      }
    }
  }

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

  const handleSubmitDishCompositionRequest = () => {
    if (dishCompositionID) {
      const ToSend = {
        body_mass: dishCompositionRequest.body_mass ?? 0,
        dish_mass: dishCompositionRequest.dish_mass ?? 0,
        dish: dishCompositionRequest.dish ?? ''
      };
      try {
        dispatch(submitDishCompositionRequest({ dishCompositionID: dishCompositionID, dishCompositionRequest: ToSend }));
        navigate(`${ROUTES.DISHCOMPOSITIONLIST}`);
      } catch (error) {
        console.log("submitDishCompositionRequest error")
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
          <Form className="w-50 mx-auto mt-5" >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Масса блюда:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="dish-composition-form-control"  
                name="dish_mass"             
                value={dishCompositionRequest.dish_mass}
                placeholder="Масса блюда..."
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
                    <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Масса тела:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="body_mass"       
                value={dishCompositionRequest.body_mass}
                placeholder="Масса тела..." 
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Блюдо:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="dish"           
                value={dishCompositionRequest.dish}
                placeholder="Блюдо..."
                onChange={handleInputChange} 
              />
            </Col>
          </Form.Group>
          {(isDraft) && (
          <Button type="submit" className="w-auto save-btn justify-content-center" onClick={handleSaveDishCompositionRequest}>
            Сохранить
          </Button>
          )}
        </Form>
        )}
          <div className="cards-wrapper-2 d-flex flex-column align-items-center w-75 m-auto">
            <h2 className="align-self-start">Нутриенты:</h2>
            {nutrients.length ? (
              nutrients.map((item) => (
                  <DishCompositionNutrientCard
                    name={item.nutrient?.name}
                    img_url={item.nutrient?.img_url}
                    nutrientId={item.nutrient?.id}
                    quantity_in_dish={item.quantity_in_dish}
                    daily_dose_percentage={item.daily_dose_percentage}
                  />
              ))
            ) : (
              <section className="nutrients-not-found">
                <h1>К сожалению, пока ничего не найдено :(</h1>
              </section>
            )}
            {(isDraft) && (
              <div className="hstack">
              <Button type="submit" className="w-auto m-4 save-btn justify-content-center" onClick={handleSubmitDishCompositionRequest}>
                Отправить на рассчет
              </Button>
              <Button className="btn delete-btn m-4 ms-auto justify-content-center" onClick={handleDelete}>
                Удалить
              </Button>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

export default DishCompositionPage;