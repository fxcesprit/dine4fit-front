import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./DishCompositionBtn.css";
import { getDishCompositionBtn } from "../modules/NutrientsApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

interface ICardProps {
}

export const DishCompositionBtn: FC<ICardProps> = ({
}) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dishCompositionID = useSelector((state: RootState) => state.dishCompositionDraft.dishCompositionID);
    const nutrientsAmount = useSelector((state: RootState) => state.dishCompositionDraft.count);


    // Событие нажатия на иконку "корзины"
    const handleClick = (dishCompositionID: number) => {
      if (dishCompositionID > 0) navigate(`${ROUTES.DISHCOMPOSITION}/${dishCompositionID}`);
    };

    useEffect(() => {

    }, []) 

  return (
    <Button
        className={
          "dish-composition-btn" +
          (!!nutrientsAmount ? " dish-composition-btn--highlight" : "")
        }
        onClick={() => handleClick(dishCompositionID? dishCompositionID : NaN)}
    >
        Рассчет рациона <sup className="nutrients-amount">{(!isAuthenticated || !dishCompositionID) ? null : nutrientsAmount}</sup>
    </Button>
  )
}

export default DishCompositionBtn;