import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./NutrientsCard.css";
import defaultimage from "../assets/DefaultImage.png";
import { addDishCompositionNutrient, } from '../slices/dishCompositionSlice'
import { getNutrientsByName } from '../slices/nutrientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

interface ICardProps {
  nutrientId?: number | string;
  name: string;
  short_desc?: string | null;
  daily_dose_min?: string | null;
  daily_dose_max?: string | null;
  img_url?: string | null;
  imageClickHandler?: () => void;
}

export const NutrientCard: FC<ICardProps> = ({
  nutrientId,
  name,
  short_desc,
  daily_dose_min,
  daily_dose_max,
  img_url,
  imageClickHandler,
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const handleAdd = async () => {
      if (nutrientId) {
          await dispatch(addDishCompositionNutrient(nutrientId as string));
          await dispatch(getNutrientsByName()); // Для обновления отображения состояния иконки "корзины" 
      }
  }

  const handleImageError = (e: any) => {
    e.target.src = defaultimage;
  }

  return (
    <Card className="nutrient align-items-center py-3">
      <Card.Img
        className="cardImage"
        variant="top"
        src={img_url?  img_url : defaultimage}
        onError={handleImageError}
        height={160}
        width={160}
        onClick={imageClickHandler}
      />
      <Card.Body className="py-0">
        <Card.Title className="title">{name}</Card.Title>
        <Card.Subtitle className="daily-dose">{daily_dose_min} - {daily_dose_max} г / кг массы тела</Card.Subtitle>
        <Card.Text className="short-desc lh-1">{short_desc}</Card.Text>
      </Card.Body>
        {/* <Stack direction="horizontal" gap={1}> */}
          <Button
            className="cardButton btn-desc"
            onClick={imageClickHandler}
          >
            Описание
          </Button>
          {(isAuthenticated == true ) && (
            <Button
              className="cardButton btn-add"
              target="_self"
              onClick={() => handleAdd()}
            >
              Добавить
            </Button>
        )}
    </Card>
  );
};