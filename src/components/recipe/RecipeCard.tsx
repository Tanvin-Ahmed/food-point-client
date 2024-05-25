import { RecipeListType } from "../../types";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../shared/OptimizedImage";

const RecipeCard = ({
  _id,
  country,
  creatorEmail,
  image,
  purchasedBy,
  title,
}: RecipeListType) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex md:max-h-[300px]">
      {/* Image section */}
      <div className="md:w-1/2">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="p-4 md:w-1/2 flex flex-col justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-orange-500">{title}</h2>
          <p className="text-gray-600 mb-4">{country}</p>
          <p className="text-gray-700">Creator Email: {creatorEmail}</p>
          <p className="text-gray-700">
            Purchased by: {purchasedBy.length} user
          </p>
        </div>
        <button
          onClick={() => navigate(`/recipe-details/${_id}`)}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded transition-all hover:bg-orange-600"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
