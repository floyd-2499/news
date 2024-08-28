import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutMain from "./components/layout";
import uris from "./config/uris";
import NEWSApiMain from "./pages/news-api";
import NewYorkTimesMain from "./pages/new-york-times";
import TheGuardianMain from "./pages/the-guardian";
import HomeMain from "./pages/home";

function App() {

  const router = createBrowserRouter([
    {
      path: uris.home,
      element: <LayoutMain Component={<HomeMain />} />
    },
    {
      path: uris.newsApi,
      element: <LayoutMain Component={<NEWSApiMain />} />
    },
    {
      path: uris.theGuardian,
      element: <LayoutMain Component={<TheGuardianMain />} />
    },
    {
      path: uris.newyorkTimes,
      element: <LayoutMain Component={<NewYorkTimesMain />} />
    },
    {
      path: "*", // Catch-all for undefined routes
      element: <LayoutMain Component="Error" /> // You can create the Error component later
    }
  ]);


  return <RouterProvider router={router} />
}

export default App;
