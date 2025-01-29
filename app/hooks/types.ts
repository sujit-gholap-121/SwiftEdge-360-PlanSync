// types/auth.ts
import { User } from "firebase/auth";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  loginWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
}
