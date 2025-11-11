import { FC, useEffect } from "react";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { getNutrientsByName } from "../modules/NutrientsApi";
import InputField from "../components/InputField";
import { Col, Row } from "react-bootstrap";
import { NutrientCard } from "../components/NutrientCard";
import { useNavigate } from "react-router-dom";
import NavigationComponent from "../components/Navigation";
import DishCompositionBtn from "../components/DishCompositionBtn";
import "./NutrientsPage.css";
import { useDispatch } from "react-redux";
import { setFilterNameAction, setNutrientsAction, useNutrients, useNutrientsFilterName } from "../slices/nutrientSlice";

const NutrientsPage: FC = () => {

    const dispatch = useDispatch();
    const searchValue = useNutrientsFilterName()
    const nutrients = useNutrients();

    const navigate = useNavigate();

    const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {e.preventDefault();}
      const data = await getNutrientsByName(searchValue);
      dispatch(setNutrientsAction(data));
    };

    const handleCardClick = (id: number) => {
        navigate(`${ROUTES.NUTRIENTS}/${id}`);
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
    <>
        <NavigationComponent />
        <Row className="nutrients-page-top">
          <Col>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.NUTRIENTS }]} />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
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
          <Row xs={2} md={3} className="g-3 mx-5">
            {nutrients.map((item, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <NutrientCard
                  nutrientId = {item.id}
                  imageClickHandler={() => {handleCardClick(item.id)}}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        ))}
    </>
    );
};

export default NutrientsPage;