import { useEffect, useState } from "react";
import Counter from "./Counter";
import { AxiosInstance } from "../../libs/axiosInstance";
import { DocumentCountType } from "../../types";

const SuccessStory = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalRecipe, setTotalRecipe] = useState(0);

  useEffect(() => {
    (async () => {
      const { data: userCount } = await AxiosInstance<DocumentCountType>(
        "/users/count"
      );
      setTotalUser(userCount.count);

      const { data: recipeCount } = await AxiosInstance<DocumentCountType>(
        "/recipe/get-recipe-count"
      );
      setTotalRecipe(recipeCount.count);
    })();
  }, []);

  return (
    <div className="mt-12">
      <h1 className="text-4xl font-bold mb-3">Success Stories</h1>
      <div className="bg-[url('/images/success1.jpg')] bg-no-repeat bg-cover bg-center h-full flex justify-center items-center p-4 rounded-md">
        <div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            <p className="text-justify text-white backdrop-blur-sm rounded-lg p-4 pl-0">
              Food Point is a thriving recipe-sharing platform that empowers
              home cooks to share their culinary creations and discover new
              dishes from around the world. By fostering a supportive community,
              Food Point transforms meal planning into an exciting adventure,
              offering features like powerful search, personalized
              recommendations, and interactive cooking challenges. The platform
              celebrates user contributions with highlights such as "Chef of the
              Week" and provides valuable resources like tutorials and live
              cooking classes to help users enhance their skills. Join Food
              Point to share your recipes, explore diverse flavors, and connect
              with fellow food enthusiasts globally.
            </p>
            <div className="flex justify-center items-center flex-wrap gap-4">
              <Counter label="Total User" count={totalUser} />
              <Counter label="Total Recipe" count={totalRecipe} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
