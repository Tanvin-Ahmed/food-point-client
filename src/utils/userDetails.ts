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
