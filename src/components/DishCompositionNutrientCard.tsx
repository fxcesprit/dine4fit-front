import { FC } from "react";
import "./DishCompositionNutrientCard.css"
import { Button, Card, CardText, Col, Row, Stack } from "react-bootstrap";
import defaultimage from "../assets/DefaultImage.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteDishCompositionNutrient, setDishCompositionNutrients } from "../slices/dishCompositionSlice";

interface ICardProps {
  nutrientId?: number | undefined;
  name: string | undefined;
  img_url?: string | null;
  quantity_in_dish: number | null;
  daily_dose_percentage: number | null;
}

export const DishCompositionNutrientCard: FC<ICardProps> = ({
  nutrientId,
  name,
  img_url,
  quantity_in_dish,
  daily_dose_percentage
}) => {
    const dispatch = useDispatch<AppDispatch>()
    const isDraft = useSelector((state: RootState) => state.dishCompositionDraft.isDraft);
    const dishCompositionId = useSelector((state: RootState) => state.dishCompositionDraft.dishCompositionID)
    const dishCompositionNutrients = useSelector((state: RootState) => state.dishCompositionDraft.nutrients)

    const handleImageError = (e: any) => {
        e.target.src = defaultimage;
    }

    const handleDeleteDishCompositionNutrient = async () => {
      if (dishCompositionId && nutrientId) {
          await dispatch(deleteDishCompositionNutrient({ dishCompositionID: dishCompositionId, nutrientId: nutrientId }));
          dispatch(setDishCompositionNutrients(dishCompositionNutrients.filter(nutrients => nutrients.nutrient?.id !== nutrientId)));
      }
    }

    const handleSaveDishCompositionNutrient = async () => {

    }

    return (
    <Card className="dish-composition-nutrient p-3">
      <Stack direction="horizontal">  
        <Card.Img
          className="cardImage"
          variant="top"
          src={img_url?  img_url : defaultimage}
          onError={handleImageError}
          height={160}
          width={160}
        />
        <Card.Body className="py-0">
          <Row>
            <Col>
              <Card.Title className="">{name}</Card.Title>
              <Card.Text>
                Количество в блюде: {quantity_in_dish}г<br/>
                Ваш процент дневной нормы: {daily_dose_percentage}%<br/>
              </Card.Text>
            </Col>
            {(isDraft) && (
            <Col md="auto">
             <Button className="m-1 btn btn-save" onClick={() => handleSaveDishCompositionNutrient()}>
                  Сохранить
              </Button>
              <Button className="m-1 btn delete-btn" onClick={() => handleDeleteDishCompositionNutrient()}>
                  Удалить
              </Button>
            </Col>
          )}
          </Row>
        </Card.Body>
      </Stack>
    </Card>
  );
}