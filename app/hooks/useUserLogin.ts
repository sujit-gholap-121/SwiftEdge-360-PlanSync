import { useAtomValue, useSetAtom } from "jotai";
import { LoginAtomType, userAtom } from "../atoms/userAtom";

// Utility hooks for reading and writing separately
export const useUserLoginInfo = () => useAtomValue(userAtom);

export const useSetUserLoginInfo = () => useSetAtom(userAtom);
