import "./NutrientPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import defaultImage from "../assets/DefaultImage.jpg";
import { Nutrients, getNutrientById } from "../modules/NutrientsApi";
import NavigationComponent from "../components/Navigation";

export const NutrientPage: FC = () => {
  const [pageData, setPageDdata] = useState<Nutrients>();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getNutrientById(id)
      .then((response) => setPageDdata(response))
      .catch(
        () => {}
        //   setPageDdata(
        //     SONGS_MOCK.results.find(
        //       (album) => String(album.collectionId) == id
        //     )
        //   ) /* В случае ошибки используем мок данные, фильтруем по ид */
      );
  }, [id]);

  return (
    <>
        <NavigationComponent />
        <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.NUTRIENTS, path: ROUTES.NUTRIENTS },
          { label: pageData?.name || "Нутриент" },
        ]}
      />
      {pageData ? (
        <div className="nutrient_desc">
            <div className="top">
                <img src={`${pageData.img_url?  pageData.img_url : defaultImage}`}/>
                    <div className="top_text">
                        <p className="title">{ pageData.name } - описание</p>
                        <p className="daily_dose">Суточная норма: { pageData.daily_dose_min } - { pageData.daily_dose_max } г / кг массы тела</p>
                    </div>
            </div>
            <div className="full_desc">
                <p>{ pageData.full_desc }</p>
            </div>
        </div>
      ) : (
        <div>
          <Spinner/>
        </div>
      )}
    </>
  );
};