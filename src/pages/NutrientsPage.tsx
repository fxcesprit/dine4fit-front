import { FC, useEffect } from "react";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { getNutrientsByName, useNutrients } from "../slices/nutrientSlice";
import InputField from "../components/InputField";
import { Col, Row } from "react-bootstrap";
import { NutrientCard } from "../components/NutrientCard";
import { useNavigate } from "react-router-dom";
import NavigationComponent from "../components/Navigation";
import DishCompositionBtn from "../components/DishCompositionBtn";
import "./NutrientsPage.css";
import { useDispatch } from "react-redux";
import { setFilterNameAction, useNutrientsFilterName } from "../slices/nutrientSlice";
import { AppDispatch } from "../store/store";

const NutrientsPage: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchValue = useNutrientsFilterName()
    const nutrients = useNutrients();

    const navigate = useNavigate();

    const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {e.preventDefault();}
      await dispatch(getNutrientsByName());
    };

    const handleCardClick = (id: number | undefined) => {
        navigate(`${ROUTES.NUTRIENTS}/${id}`);
    };

    useEffect(() => {
        dispatch(getNutrientsByName());
    }, [dispatch]);

    return (
    <>
        <NavigationComponent />
        <Row className="nutrients-page-top">
          <div className="search__mobile">
            <InputField
              value={searchValue}
              placeholder="Ищите нутриенты..."
              setValue={(value) => dispatch(setFilterNameAction(value))}
              onSubmit={handleSearch}
            />
          </div>
          <Col>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.NUTRIENTS }]} />
          </Col>
          <Col className="justify-content-center align-items-center search__desktop">
            <InputField
              value={searchValue}
              placeholder="Ищите нутриенты..."
              setValue={(value) => dispatch(setFilterNameAction(value))}
              onSubmit={handleSearch}
            />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <DishCompositionBtn />
          </Col>
        </Row>
        {(!nutrients.length /* Проверка на существование данных */ ? (
          <div>
            <h3>К сожалению, пока ничего не найдено :(</h3>
          </div>
        ) : (
          <div className="cards__wrapper">
            {nutrients.map((item) => (
              <div key={`${item.id}`} className="card__item">
                <NutrientCard
                  nutrientId = {item.id}
                  imageClickHandler={() => {handleCardClick(item.id)}}
                  {...item}
                />
              </div>
            ))}
          </div>
        ))}
    </>
    );
};

export default NutrientsPage;