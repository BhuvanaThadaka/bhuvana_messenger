
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
