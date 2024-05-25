import { jwtDecode, JwtPayload } from "jwt-decode";

type userPayload = JwtPayload & {
  data: {
    email: string;
    _id: string;
  };
};

export const tokenPatternCheck = (token: string = ""): boolean => {
  const jwtRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]*$/;
  const pattern = jwtRegex.test(token);

  return pattern;
};

export const isLoggedInUser = (): boolean => {
  const str = localStorage.getItem("auth");
  if (str) {
    const token = JSON.parse(str);
    if (tokenPatternCheck(token)) {
      const { exp } = jwtDecode<userPayload>(JSON.parse(str));
      if (!exp) return false;

      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    }
  }

  return false;
};

export const setAuthInfo = (token: string) => {
  localStorage.setItem("auth", JSON.stringify(token));
};

export const getTokenFromLocal = () => {
  const token = localStorage.getItem("auth");
  if (token) {
    return JSON.parse(token) as string;
  }
  return "";
};

export const userInfoFromLocal = () => {
  const str = localStorage.getItem("auth");

  if (str) {
    const { data, exp } = jwtDecode<userPayload>(JSON.parse(str));
    if (!exp) return null;

    if (Date.now() >= exp * 1000) {
      return null;
    }
    return data;
  }
  return null;
};

export const removeAuthInfo = () => {
  localStorage.removeItem("auth");
};
