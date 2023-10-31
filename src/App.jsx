import React, { useState } from "react";

import MainPage from "./Pages/mainPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<MainPage/>),
  },
  {
    path: "/coins/:Id",
    element: (<DetailsPage/>),
  },
]);

function App() {
  
 
  
  return (
    <RouterProvider router={router} />
   );
}

export default App;