import { FC, useEffect } from "react"
import NavigationComponent from "../components/Navigation"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getDishCompositionList } from "../slices/dishCompositionListSlice";
import { Container, Table } from "react-bootstrap";

export const DishCompositionListPage: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const dishCompositionList = useSelector((state: RootState) => state.dishCompositionList.dishCompoisitionList)
    
    useEffect(() => {
        dispatch(getDishCompositionList());
    }, [dispatch]);

    return (
        <>
            <NavigationComponent/>
            <Container className="justify-content-start mt-5 h-50">
            <h2 className="align-self-start mb-3">Ваши заявки на рассчет содержания нутриентов</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Дата оформления</th>
                    <th>Дата завершения</th>
                    </tr>
                </thead>
                <tbody>
                    {dishCompositionList.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.status}</td>
                            <td>{item.creation_datetime ?? '---'}</td>
                            <td>{item.formation_datetime ?? '---'}</td>
                            <td>{item.completion_datetime ?? '---'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
        </>
    )
};

export default DishCompositionListPage;