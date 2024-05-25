import React, { useEffect, useState } from "react";
import { UserType } from "../types";
import { appContext } from "./createContext";
import { AxiosInstance } from "../libs/axiosInstance";
import {
  getTokenFromLocal,
  setAuthInfo,
  tokenPatternCheck,
  userInfoFromLocal,
} from "../utils/userDetails";

type Props = {
  children: React.ReactNode;
};

const AppContext = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    if (!userInfo) {
      (async () => {
        if (getTokenFromLocal()) {
          const user = userInfoFromLocal();
          const { data } = await AxiosInstance.get(`/users/get/${user?.email}`);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setUserInfo(data);
        }
      })();
    }
  }, [userInfo]);

  useEffect(() => {
    (async () => {
      if (tokenPatternCheck(getTokenFromLocal())) {
        const user = userInfoFromLocal();
        const { data } = await AxiosInstance.post(`/users/refresh-token`, user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setAuthInfo(data.token);
      }
    })();
  }, []);

  return (
    <appContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
