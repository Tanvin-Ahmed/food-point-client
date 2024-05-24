import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setAuthInfo } from "../../utils/userDetails";
import toast from "react-hot-toast";
import { app } from "../config";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    setAuthInfo({
      token,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      email: user.email || "",
    });

    toast.success("Welcome to Food Point!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Something went wrong!");
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.customData.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
  }
};
