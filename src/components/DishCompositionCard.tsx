import { FC } from "react";
import "./DishCompositionCard.css"
import { Button, Card, CardText, Col, Row, Stack } from "react-bootstrap";
import defaultimage from "../assets/DefaultImage.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteDishCompositionNutrient, setDishCompositionNutrients } from "../slices/dishCompositionSlice";

interface ICardProps {
  id?: number | undefined;
  status: string | undefined;
  creation_datetime?: string;
  formation_datetime?: string | null;
  completion_datetime?: string | null;
  nutrients_count: number;
}

const formatDateTimeRu = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    // если вдруг пришёл какой-то странный формат — возвращаем как есть
    return value;
  }

  // Если нужна дата + время
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Если нужна только дата — можно так:
  // return date.toLocaleDateString("ru-RU", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });
};


export const DishCompositionCard: FC<ICardProps> = ({
    id,
    status,
    creation_datetime,
    formation_datetime,
    completion_datetime,
    nutrients_count=0,
}) => {
    return (
    <Card className="dish-composition-card p-3">
        <Card.Body className="py-0">
            <div className="">{id}</div>
            <div className="">{status}</div>
            <div>{formatDateTimeRu(creation_datetime)}</div>
            <div>{formatDateTimeRu(formation_datetime)}</div>
            <div>{formatDateTimeRu(completion_datetime)}</div>
            <div className="">{nutrients_count}</div>
        </Card.Body>
    </Card>
  );
}