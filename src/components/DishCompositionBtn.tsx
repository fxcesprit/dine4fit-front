import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./DishCompositionBtn.css";

interface ICardProps {
}

export const DishCompositionBtn: FC<ICardProps> = ({
}) => {

    const [nutrientsAmount, setNutrientsAmount] = useState(0);

  return (
    <Button
        className="dish-composition-btn"
    >
        Рассчет рациона <sup>{nutrientsAmount}</sup>
    </Button>
  )
}

export default DishCompositionBtn;