import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
