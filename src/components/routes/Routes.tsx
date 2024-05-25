import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { ComponentType, FC, Suspense, lazy } from "react";
import { LuLoader2 } from "react-icons/lu";
import PrivateRoute from "./PrivateRoute";
import { AxiosInstance } from "../../libs/axiosInstance";
import { RecipeType } from "../../types";

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
const Recipes = Loadable(lazy(() => import("../../pages/Recipes")));
const RecipeDetails = Loadable(lazy(() => import("../../pages/RecipeDetails")));

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
          path: "all-recipes",
          element: <Recipes />,
        },
        {
          path: "add-recipe",
          element: (
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          ),
        },
        {
          path: "recipe-details/:id",
          element: (
            <PrivateRoute>
              <RecipeDetails />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const { data: details } = await AxiosInstance<RecipeType>(
              `/recipe/details/${params.id}`
            );

            const { data: similarRecipes } = await AxiosInstance<RecipeType[]>(
              `/recipe/recipes-by-category/${details.category}/${details._id}`
            );

            return { details, similarRecipes };
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
