import { FC } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import "./NutrientsCard.css";
import defaultimage from "../assets/DefaultImage.jpg";

interface ICardProps {
  nutrientId?: number
  name: string;
  short_desc: string;
  daily_dose_min: string;
  daily_dose_max: string;
  img_url: string;
  imageClickHandler?: () => void;
}

export const NutrientCard: FC<ICardProps> = ({
  name,
  short_desc,
  daily_dose_min,
  daily_dose_max,
  img_url,
  imageClickHandler,
}) => {

  return (
    <Card className="nutrient align-items-center py-3">
      <Card.Img
        className="cardImage"
        variant="top"
        src={img_url?  img_url : defaultimage}
        height={160}
        width={160}
        onClick={imageClickHandler}
      />
      <Card.Body className="py-0">
        <Card.Title className="title">{name}</Card.Title>
        <Card.Subtitle className="daily-dose">{daily_dose_min} - {daily_dose_max} г / кг массы тела</Card.Subtitle>
        <Card.Text className="short-desc lh-1">{short_desc}</Card.Text>
      </Card.Body>
        <Stack direction="horizontal" gap={1}>
          <Button
            className="cardButton btn-desc"
            onClick={imageClickHandler}
          >
            Описание
          </Button>
          {/* <Button
            className="cardButton btn-add"
            href={''}
            target="_self"
          >
            Добавить
          </Button> */}
        </Stack>
    </Card>
  );
};