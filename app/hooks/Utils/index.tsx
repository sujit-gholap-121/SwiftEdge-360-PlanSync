import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useUserLoginInfo, useSetUserLoginInfo } from "../useUserLogin";
import { useAuth } from "../useAuth2";

interface SessionData {
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
}

const getSessionFromStorage = () => {
  const session = sessionStorage.getItem("firebaseUser");
  return session ? JSON.parse(session) : null;
};
const refreshUserToken = async (user: User | null) => {
  // try {
  // const result = await user?.getIdToken(true); // Refresh token in stsTokenManager
  // const { , expirationTime, refreshToken } = user.stsTokenManager;
  console.log("result", {});
  const sessionData = {
    accessToken: "",
    refreshToken: user?.refreshToken,
    expirationTime: 123,
  };
  // saveSessionToStorage();
  return sessionData;
};
// catch (error) {
//   console.error("Error refreshing token:", error);
//   return null;
// }
// };

export const handleSessionLogin = async () => {
  const { loginWithGoogle } = useAuth();

  const auth = getAuth();
  const { user, loading, error } = useUserLoginInfo();
  console.log("user", user);
  const setAuthState = useSetUserLoginInfo();
  // useEffect(() => {
  // console.log({ user });
  if (!user) {
    const isUserSavedInSessionStorage =
      typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("firebaseUser") || "");
    console.log("isUserSavedInSessionStorage", isUserSavedInSessionStorage);

    // if (isUserSavedInSessionStorage) {
    //   if (Date.now) {
    //     // Session is valid
    //     setAuthState({ user: session as User, error: "", loading: false });
    //   } else {
    //     // Refresh token if expired
    //     // const refreshedSession = await session.user.getIdTokenResult(true);
    //     // if (refreshedSession) {
    //     //   setAuthState({
    //     //     user: refreshedSession,
    //     //     error: "",
    //     //     loading: false,
    //     //   });
    //     // } else {
    //     //   setAuthState({
    //     //     user: null,
    //     //     error: "session storafe refresh erro",
    //     //     loading: false,
    //     //   });
    //     // }
    //   }
    // }
  }

  // const unsubscribe = onAuthStateChanged(auth, async (user) => {

  // });

  // return () => unsubscribe();
  // }, []);
};
