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

  const isStaff = useSelector(
    (state: RootState) => state.user.isStaff
  );

  // Локальные фильтры
  type tstatus = "FO" | "CO" | "RE" | "";
  const [statusFilter, setStatusFilter] = useState<tstatus>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [clientFilter, setClientFilter] = useState<string>("");

  // Short polling + фильтры, которые уходят на бэкенд
  useEffect(() => {
    const filters = {
      status: statusFilter || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    dispatch(getDishCompositionList(filters));

    const intervalId = setInterval(() => {
      dispatch(getDishCompositionList(filters));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch, statusFilter, startDate, endDate]);

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
    setClientFilter("");
    dispatch(getDishCompositionList(undefined));
  };

  // Фильтрация по создателю заявки только на фронте и только для модераторов
  const filteredDishCompositionList = dishCompositionList.filter((item) => {
    if (!isStaff) {
      // Обычным пользователям показываем всё, что пришло с бэка
      return true;
    }

    if (!clientFilter.trim()) {
      // Если фильтр по клиенту пустой — тоже показываем всё
      return true;
    }

    const client = (item.client || "").toLowerCase();
    const search = clientFilter.trim().toLowerCase();

    return client.includes(search);
  });

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

            <Col xs={3}>
              <Form.Group controlId="startDate">
                <Form.Label>Дата формирования с</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={3}>
              <Form.Group controlId="endDate">
                <Form.Label>Дата формирования по</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            {isStaff && (
              <Col xs={3}>
                <Form.Group controlId="clientFilter">
                  <Form.Label>Создатель заявки</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="email клиента"
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Row className="mt-3">
            <Col
              xs={12}
              md={3}
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
        {filteredDishCompositionList.map((item) => (
          <DishCompositionCard
            key={item.id}
            id={item.id}
            status={item.status}
            creation_datetime={item.creation_datetime}
            formation_datetime={item.formation_datetime}
            completion_datetime={item.completion_datetime}
            nutrients_count={item.calculated_nutrients_count}
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
