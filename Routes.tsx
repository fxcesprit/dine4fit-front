export const ROUTES = {
  LOGIN: "/login",
  REGISTRATION: "/register",
  USERPAGE: "/users",
  HOME: "/",
  NUTRIENTS: "/nutrients",
  DISHCOMPOSITION: "/dish_composition",
  DISHCOMPOSITIONLIST: "/dish_compositions"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  LOGIN: "Авторизация",
  REGISTRATION: "Регистрация",
  USERPAGE: "Личный кабинет",
  HOME: "Главная",
  NUTRIENTS: "Нутриенты",
  DISHCOMPOSITION: "Состав блюда",
  DISHCOMPOSITIONLIST: "Заявки на описание"
};