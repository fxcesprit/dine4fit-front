import { ChangeEvent, FC, FormEvent, useState } from "react"
import NavigationComponent from "../components/Navigation"
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { loginUserAsync, registerUserAsync } from "../slices/userSlice";


export const UserPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            await dispatch(registerUserAsync(formData))
            .then(async () => {
                await dispatch(loginUserAsync(formData))
            })
            navigate(`${ROUTES.NUTRIENTS}`);
        }
    };
    return (
    <>
        <NavigationComponent/>
        <Container style={{ maxWidth: '400px'}}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Личный кабинет</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                    <Form.Label>Новая почта</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите адрес почты"
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mx-auto text-center justify-content-center">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    </>
  )
};

export default UserPage;