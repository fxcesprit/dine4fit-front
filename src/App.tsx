import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import NutrientsPage from "./pages/NutrientsPage";
import { NutrientPage } from "./pages/NutrientPage";
import LoginPage from "./pages/LoginPage";
import DishCompositionPage from "./pages/DishCompositionPage";

function App() {
  return (
    <BrowserRouter basename="/dine4fit-front">
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} index element={<LoginPage />} />
        <Route path={`${ROUTES.NUTRIENTS}/:id`} element={<NutrientPage />} />
        <Route path={ROUTES.NUTRIENTS} element={<NutrientsPage />} />
        <Route path={`${ROUTES.DISHCOMPOSITION}/:dishCompositionID`} element={<DishCompositionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;