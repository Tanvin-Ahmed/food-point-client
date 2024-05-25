import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedInUser } from "../../utils/userDetails";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isUser = isLoggedInUser();
  return isUser ? (
    children
  ) : (
    <Navigate to={"/"} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
