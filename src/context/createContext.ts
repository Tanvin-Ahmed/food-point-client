import { createContext } from "react";
import { UserType } from "../types";

interface AppContextValues {
  userInfo: UserType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// Set default values for from and to
const defaultValues: AppContextValues = {
  userInfo: null,
  setUserInfo: () => {},
};

export const appContext = createContext<AppContextValues>(defaultValues);
