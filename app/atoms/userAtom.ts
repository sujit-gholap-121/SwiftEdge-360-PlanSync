import { User } from "firebase/auth";
import { atom } from "jotai";

// export type LoginAtomType = User & {
//   isLoggedIn: Boolean;
// };

export const userAtom = atom<User | null>(null);
