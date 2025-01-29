import { atom } from "jotai";
import { AuthState } from "../hooks/types";

export const userAtom = atom<AuthState>({
  user: null,
  loading: true,
  error: null,
});
