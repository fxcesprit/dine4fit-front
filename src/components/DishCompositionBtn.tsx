import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./DishCompositionBtn.css";
import { getDishCompositionBtn } from "../modules/NutrientsApi";

interface ICardProps {
}

export const DishCompositionBtn: FC<ICardProps> = ({
}) => {

    const [nutrientsAmount, setNutrientsAmount] = useState(0);

    useEffect(() => {
      getDishCompositionBtn().then(
        (response) => {
          setNutrientsAmount(response.dish_composition_draft.nutrient_types_amount)
        }
      )

    }, []) 

  return (
    <Button
        className="dish-composition-btn"
    >
        Рассчет рациона <sup>{nutrientsAmount}</sup>
    </Button>
  )
}

export default DishCompositionBtn;