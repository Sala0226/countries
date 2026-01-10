import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CountryDetails from "../pages/CountryDetails";
import Favorites from "../pages/Favorites";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
  path: "/favorites",
  element: <Favorites />,
},

      { path: "/country/:name", element: <CountryDetails /> }
    ]
  }
]);
