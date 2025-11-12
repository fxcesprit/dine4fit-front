import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import NutrientsPage from "./pages/NutrientsPage";
import { NutrientPage } from "./pages/NutrientPage";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";


function App() {
  useEffect(() => {
    invoke('tauri', {cmd: 'create'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', {cmd: 'close'})
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      }
  }, [])

  return (
    <BrowserRouter basename="/dine4fit-front">
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={`${ROUTES.NUTRIENTS}/:id`} element={<NutrientPage />} />
        <Route path={ROUTES.NUTRIENTS} element={<NutrientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;