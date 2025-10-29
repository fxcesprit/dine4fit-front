import { FC, useEffect, useState } from "react";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { getNutrientsByName, Nutrients } from "../modules/NutrientsApi";
import InputField from "../components/InputField";
import { Col, Row } from "react-bootstrap";
import { NutrientCard } from "../components/NutrientCard";
import { useNavigate } from "react-router-dom";
import NavigationComponent from "../components/Navigation";
import DishCompositionBtn from "../components/DishCompositionBtn";
import "./NutrientsPage.css";

const NutrientsPage: FC = () => {

    const [nutrientsList, setNutrientsList] = useState<Nutrients[]>([]);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {e.preventDefault();}
      getNutrientsByName(searchValue)
      .then((response) => {
          setNutrientsList(response);
      })
        // .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
        //     setMusic(
        //     SONGS_MOCK.results.filter((item) =>
        //         item.collectionCensoredName
        //         .toLocaleLowerCase()
        //         .startsWith(searchValue.toLocaleLowerCase())
        //     )
        //     );
        // });
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
              setValue={(value) => setSearchValue(value)}
              onSubmit={handleSearch}
            />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <DishCompositionBtn />
          </Col>
        </Row>
        {(!nutrientsList.length /* Проверка на существование данных */ ? (
          <div>
            <h3>К сожалению, пока ничего не найдено :(</h3>
          </div>
        ) : (
          <Row xs={2} md={3} className="g-3 mx-5">
            {nutrientsList.map((item, index) => (
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