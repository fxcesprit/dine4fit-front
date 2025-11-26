import "./NutrientPage.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import defaultImage from "../assets/DefaultImage.png";
import { getNutrientById, useNutrients } from "../slices/nutrientSlice";
import NavigationComponent from "../components/Navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export const NutrientPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nutrients = useNutrients();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getNutrientById(id as string));
  }, []);

  return (
    <>
        <NavigationComponent />
        <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.NUTRIENTS, path: ROUTES.NUTRIENTS },
          { label: nutrients[0].name || "Нутриент" },
        ]}
      />
      {nutrients ? (
        <div className="nutrient_desc">
            <div className="top">
                <img src={`${nutrients[0].img_url?  nutrients[0].img_url : defaultImage}`}/>
                    <div className="top_text">
                        <p className="title">{ nutrients[0].name } - описание</p>
                        <p className="daily_dose">Суточная норма: { nutrients[0].daily_dose_min } - { nutrients[0].daily_dose_max } г / кг массы тела</p>
                    </div>
            </div>
            <div className="full_desc">
                <p>{ nutrients[0].full_desc }</p>
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