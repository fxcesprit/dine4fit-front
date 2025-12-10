import { FC } from "react";
import "./DishCompositionCard.css"
import { Button, Card, CardText, Col, Row, Stack } from "react-bootstrap";
import defaultimage from "../assets/DefaultImage.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteDishCompositionNutrient, 
          setDishCompositionNutrients, 
          submitDishCompositionRequest, 
          completeDishCompositionRequest,
          rejectDishCompositionRequest 
        } from "../slices/dishCompositionSlice";

interface ICardProps {
  id?: number | undefined;
  status: "FO" | "CO" | "RE";
  creation_datetime?: string;
  formation_datetime?: string | null;
  completion_datetime?: string | null;
  nutrients_count: number;
  client: string;
  manager?: string;
  request: any;
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
    id=0,
    status,
    creation_datetime,
    formation_datetime,
    completion_datetime,
    nutrients_count=0,
    client,
    manager,
    request,
}) => {
  const status_dict = {"FO": "Сформирована", "RE": "Отклонена", "CO": "Завершена"}
  
  const dispatch = useDispatch<AppDispatch>();
  const isStaff = useSelector((state: RootState) => state.user.isStaff);

  const handleSubmit = async () => {
    await dispatch(completeDishCompositionRequest(id.toString()))
  }

  const handleReject = async () => {
    await dispatch(rejectDishCompositionRequest(id.toString()))
  }

    return (
    <Card className="dish-composition-card p-3 mb-3">
        <Card.Body className="py-0">
          <Row>
            <Col>
              <Card.Title className="me-2">Заявка номер {id}</Card.Title>
              <div className="mx-auto" />
              <div>Дата создания: {formatDateTimeRu(creation_datetime)}</div>
              <div>Дата формирования: {formatDateTimeRu(formation_datetime)}</div>
              <div>Дата завершения: {formatDateTimeRu(completion_datetime)}</div>
              <div className="">Рассчитано нутриентов: {nutrients_count}</div>
              <div className="">Клиент: {client}</div>
              <div className="">Нутрициолог: {manager}</div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Stack className="align-items-end" direction="vertical">
                <div className="mx-2 mb-2">{status_dict[status]}</div>
                {(isStaff && status=="FO") && (
                  <>
                    <Button className="btn-complete mb-2" onClick={handleSubmit}>Завершить</Button>
                    <Button className="btn-reject" onClick={handleReject}>Отклонить</Button>
                  </>
                )}
              </Stack>
            </Col>
          </Row>
        </Card.Body>
    </Card>
  );
}