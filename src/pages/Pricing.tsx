import { BiCheck } from "react-icons/bi";
import { pricingData } from "../utils/data";
import { LiaCoinsSolid } from "react-icons/lia";
import { isLoggedInUser } from "../utils/userDetails";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const handlePurchase = async (id: number) => {
    if (!isLoggedInUser()) {
      toast.error("Login to purchase!");
      return;
    } else {
      navigate(`/payment/${id}`);
    }
  };

  return (
    <section>
      <h1 className="text-4xl font-bold">Our offers</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
        {pricingData.map((price) => (
          <div
            key={price.id}
            className="p-4 shadow-md rounded-md h-full flex flex-col justify-between bg-orange-50"
          >
            <div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-orange-500 text-3xl font-bold flex justify-center items-center">
                  <LiaCoinsSolid className="text-orange-500 :hover:text-white" />{" "}
                  {price.coins}
                </h2>
                <p className="text-gray-600 font-bold text-lg">
                  $ {price.amount}
                </p>
              </div>

              <div className="mt-4">
                {price.details.map((detail) => (
                  <p
                    key={detail}
                    className="flex justify-start items-center gap-2 text-gray-500"
                  >
                    <BiCheck size={20} /> {detail}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handlePurchase(price.id)}
                className="button text-white bg-orange-500 hover:bg-orange-600 transition-all w-full"
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
