import { FC, useEffect, useState } from "react";
import NavigationComponent from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getDishCompositionList } from "../slices/dishCompositionListSlice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { DishCompositionCard } from "../components/DishCompositionCard";

export const DishCompositionListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dishCompositionList = useSelector(
    (state: RootState) => state.dishCompositionList.dishCompoisitionList
  );

  // Локальные фильтры
  type tstatus = "FO" | "CO" | "RE" | "";
  const [statusFilter, setStatusFilter] = useState<tstatus>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Первый запрос без фильтров
  useEffect(() => {
    dispatch(getDishCompositionList(undefined));
  }, [dispatch]);

  const handleApplyFilters = () => {
    dispatch(
      getDishCompositionList({
        status: statusFilter || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })
    );
  };

  const handleResetFilters = () => {
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
    dispatch(getDishCompositionList(undefined));
  };

  return (
    <>
      <NavigationComponent />
      <Container className="justify-content-start mt-5 h-50">
        <h2 className="align-self-start mb-3">
          Ваши заявки на рассчет содержания нутриентов
        </h2>

        {/* Фильтры */}
        <Form className="mb-4">
          <Row className="g-3">
            <Col xs={3}>
              <Form.Group controlId="statusFilter">
                <Form.Label>Статус</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                >
                  <option value="">Все</option>
                  <option value="FO">Сформирована</option>
                  <option value="CO">Завершена</option>
                  <option value="RE">Отклонена</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group controlId="startDate">
                <Form.Label>Дата формирования с</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={5}>
              <Form.Group controlId="endDate">
                <Form.Label>Дата формирования по</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
        </Row>
        <Row className="mt-3">

            <Col
              xs={12}
              md={2}
              className="d-flex align-items-end justify-content-start gap-2"
            >
              <Button variant="primary" onClick={handleApplyFilters}>
                Применить
              </Button>
              <Button variant="secondary" onClick={handleResetFilters}>
                Сброс
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Список заявок */}
        {dishCompositionList.map((item) => (
          <DishCompositionCard
            key={item.id}
            id={item.id}
            status={item.status}
            creation_datetime={item.creation_datetime}
            formation_datetime={item.formation_datetime}
            completion_datetime={item.completion_datetime}
            nutrients_count={0}
            client={item.client}
            manager={item.manager}
            request={item}
          />
        ))}
      </Container>
    </>
  );
};

export default DishCompositionListPage;
