import React, { useEffect, useState } from "react";
import { UserType } from "../types";
import { appContext } from "./createContext";
import { AxiosInstance } from "../libs/axiosInstance";
import { userInfoFromLocal } from "../utils/userDetails";

type Props = {
  children: React.ReactNode;
};

const AppContext = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    if (!userInfo) {
      (async () => {
        const { data } = await AxiosInstance.get(
          `/users/get/${userInfoFromLocal()?.email}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setUserInfo(data);
      })();
    }
  }, [userInfo]);

  return (
    <appContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
