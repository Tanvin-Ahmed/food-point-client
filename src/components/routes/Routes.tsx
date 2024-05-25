import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { ComponentType, FC, Suspense, lazy } from "react";
import { LuLoader2 } from "react-icons/lu";

const Loadable = (Component: ComponentType) => {
  const LoadableComponent: FC = (props) => (
    <Suspense
      fallback={
        <div className="h-screen w-full flex justify-center items-center">
          <LuLoader2 className="h-10 w-10 animate-spin text-orange-600" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

const Home = Loadable(lazy(() => import("../../pages/Home")));
const ErrorBoundary = Loadable(lazy(() => import("../../pages/ErrorBoundary")));
const AddRecipe = Loadable(lazy(() => import("../../pages/AddRecipe")));

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/add-recipe",
          element: <AddRecipe />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
