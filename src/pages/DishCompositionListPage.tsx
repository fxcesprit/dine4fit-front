import { FC, useEffect } from "react"
import NavigationComponent from "../components/Navigation"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getDishCompositionList } from "../slices/dishCompositionListSlice";
import { Container } from "react-bootstrap";
import { DishCompositionCard } from "../components/DishCompositionCard"

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
                    {dishCompositionList.map((item) => (
                        <DishCompositionCard 
                            id={item.id}
                            status={item.status}
                            creation_datetime={item.creation_datetime}
                            formation_datetime={item.formation_datetime}
                            completion_datetime={item.completion_datetime}
                            nutrients_count={0}
                        />
                    ))}
            </Container>
        </>
    )
};

export default DishCompositionListPage;