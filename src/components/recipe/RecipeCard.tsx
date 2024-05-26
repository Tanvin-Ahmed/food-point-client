import { RecipeListType, RecipeType, UserType } from "../../types";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../shared/OptimizedImage";
import { isLoggedInUser } from "../../utils/userDetails";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { appContext } from "../../context/createContext";
import { useConfirm } from "material-ui-confirm";
import { AxiosInstance } from "../../libs/axiosInstance";
import { LuLoader2 } from "react-icons/lu";

type PurchaseResponse = {
  buyerInfo: UserType;
  recipeInfo: RecipeType;
};

const RecipeCard = ({
  _id,
  country,
  creatorEmail,
  image,
  purchasedBy,
  title,
}: RecipeListType) => {
  const { userInfo, setUserInfo } = useContext(appContext);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const { data: creatorInfo } = await AxiosInstance.get<UserType>(
        `/users/get/${creatorEmail}`
      );
      const { data } = await AxiosInstance.put<PurchaseResponse>(
        "/recipe/purchase-recipe",
        {
          creatorId: creatorInfo._id,
          buyerId: userInfo?._id,
          recipeId: _id,
        }
      );
      setUserInfo(data.buyerInfo);

      toast.success("Welcome to purchase the recipe successfully!");
      navigate(`/recipe-details/${_id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDetailsPage = () => {
    if (!isLoggedInUser() || !userInfo) {
      toast.error("Please login to continue!");
      return;
    } else if (creatorEmail === userInfo.email) {
      navigate(`/recipe-details/${_id}`);
      return;
    } else if (
      userInfo._id === purchasedBy.find((userId) => userId === userInfo._id)
    ) {
      navigate(`/recipe-details/${_id}`);
      return;
    } else if (userInfo?.coins && userInfo?.coins < 10) {
      toast.error("Insufficient coins to purchase!");
      navigate("/pricing");
      return;
    } else if (userInfo?.coins && userInfo?.coins >= 10) {
      confirm({
        description: "Press Ok to purchase this recipe by 10 coins",
      }).then(() => {
        handlePurchase();
      });
    }
  };

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
          disabled={loading}
          onClick={handleGoToDetailsPage}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded transition-all hover:bg-orange-600"
        >
          {loading ? (
            <div className="flex justify-between items-center">
              <LuLoader2 size={20} className="text-white animate-spin" />
            </div>
          ) : (
            "Read More"
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
