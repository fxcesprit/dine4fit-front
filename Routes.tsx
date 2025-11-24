export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  NUTRIENTS: "/nutrients",
  DISHCOMPOSITION: "/dish_composition",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  LOGIN: "Авторизация",
  HOME: "Главная",
  NUTRIENTS: "Нутриенты",
  DISHCOMPOSITION: "Состав блюда",
};