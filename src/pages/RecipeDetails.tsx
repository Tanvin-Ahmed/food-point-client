import { useLoaderData, useNavigate } from "react-router-dom";
import { RecipeType } from "../types";
import OptimizedImage from "../components/shared/OptimizedImage";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useContext, useState } from "react";
import { appContext } from "../context/createContext";
import toast from "react-hot-toast";
import { AxiosInstance } from "../libs/axiosInstance";
import { LuLoader2 } from "react-icons/lu";

type payload = {
  details: RecipeType;
  similarRecipes: RecipeType[];
};

const RecipeDetails = () => {
  const { details, similarRecipes } = useLoaderData() as payload;
  const navigate = useNavigate();
  const { userInfo } = useContext(appContext);
  const [reaction, setReaction] = useState<string[]>(details.reaction);
  const [loading, setLoading] = useState(false);

  const handleReaction = async (action: "like" | "dislike") => {
    try {
      setLoading(true);
      const { data } = await AxiosInstance.put<RecipeType>("/recipe/reaction", {
        id: details._id,
        userId: userInfo?._id,
        action,
      });

      setReaction(data.reaction);

      if (action === "like") {
        toast.success("You like this recipe!");
      } else if (action === "dislike") {
        toast.success("You dislike this recipe!");
      }
    } catch (error) {
      toast.error("Reaction not updated!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3">
      <div className="flex flex-col justify-center items-center gap-4 md:col-span-3 sm:col-span-2 shadow-lg p-4">
        <OptimizedImage
          src={details.image}
          alt={details.title}
          className="max-w-lg object-contain"
        />
        <h2 className="text-3xl font-bold text-orange-500">{details.title}</h2>
        <p>Category: {details.category}</p>
        <p>Creator email: {details.creatorEmail}</p>
        <p>Country: {details.country}</p>

        <div>
          {!!details.reaction.length &&
          !!reaction.length &&
          reaction.find((userId) => userId === userInfo?._id) ? (
            <button
              disabled={loading}
              onClick={() => handleReaction("dislike")}
              className="h-10 w-10 hover:shadow-inner transition-all rounded-full shadow-md flex justify-center items-center"
            >
              {loading ? (
                <LuLoader2 size={20} className="animate-spin text-black" />
              ) : (
                <BiSolidLike size={20} />
              )}
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={() => handleReaction("like")}
              className="h-10 w-10 hover:shadow-inner transition-all rounded-full shadow-md flex justify-center items-center"
            >
              {loading ? (
                <LuLoader2 size={20} className="animate-spin text-black" />
              ) : (
                <BiLike size={20} />
              )}
            </button>
          )}
          <small className="text-gray-700">{reaction.length}+ Likes</small>
        </div>

        <h4 className="font-bold text-xl mt-12">Making Process</h4>
        <div dangerouslySetInnerHTML={{ __html: details.details }} />
        <iframe
          width="560"
          height="315"
          src={details.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="space-y-8">
        <h4 className="text-lg font-bold">Similar recipes</h4>
        {similarRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Image section */}
            <div className="w-full">
              <OptimizedImage
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-4 flex flex-col justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-orange-500">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4">{recipe.country}</p>
                <p className="text-gray-700">
                  Creator Email: {recipe.creatorEmail}
                </p>
                <p className="text-gray-700">
                  Purchased by: {recipe.purchasedBy.length} user
                </p>
              </div>
              <button
                onClick={() => navigate(`/recipe-details/${recipe._id}`)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded transition-all hover:bg-orange-600"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
