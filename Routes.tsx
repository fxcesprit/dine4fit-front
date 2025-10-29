export const ROUTES = {
  HOME: "/",
  ALBUMS: "/albums",
  NUTRIENTS: "/nutrients",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  ALBUMS: "Альбомы",
  NUTRIENTS: "Нутриенты",
};