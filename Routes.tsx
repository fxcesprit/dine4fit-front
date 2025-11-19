export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  ALBUMS: "/albums",
  NUTRIENTS: "/nutrients",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  LOGIN: "Авторизация",
  HOME: "Главная",
  ALBUMS: "Альбомы",
  NUTRIENTS: "Нутриенты",
};