import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../context/createContext";
import { IoAddCircle, IoFastFoodSharp } from "react-icons/io5";
import { signInWithGoogle } from "../../firebase/auth/google";

const Banner = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(appContext);
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex items-center justify-center gap-4 h-full w-full bg-black bg-opacity-50">
        <button
          onClick={() => navigate("/all-recipes")}
          className="button text-orange-500 hover:text-white hover:bg-orange-600"
        >
          <IoFastFoodSharp size={20} />
          See recipes
        </button>
        <button
          onClick={() => {
            if (userInfo?.email) {
              navigate("/add-recipe");
            } else {
              signInWithGoogle();
            }
          }}
          className="button bg-orange-600 text-white hover:text-orange-500 hover:bg-transparent"
        >
          <IoAddCircle size={20} />
          Add recipes
        </button>
      </div>
    </div>
  );
};

export default Banner;
