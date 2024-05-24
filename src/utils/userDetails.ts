import { UserType } from "../types";

export const isLoggedInUser = (): boolean => {
  const str = localStorage.getItem("auth");
  let user = null;
  if (str) {
    user = JSON.parse(str);
  }

  return !!user;
};

export const setAuthInfo = (info: UserType) => {
  localStorage.setItem("auth", JSON.stringify(info));
};

export const userInfoFromLocal = () => {
  const str = localStorage.getItem("auth");

  if (str) {
    return JSON.parse(str) as UserType;
  }
  return null;
};

export const removeAuthInfo = () => {
  localStorage.removeItem("auth");
};
