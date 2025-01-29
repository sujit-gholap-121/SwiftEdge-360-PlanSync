import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

export const useUserLoginInfo = () => useAtomValue(userAtom);

export const useSetUserLoginInfo = () => useSetAtom(userAtom);
