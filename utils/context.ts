import { createContext } from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext<authContextProps>(null);

interface authContextProps {
  user: User | null;
  isLoading: boolean;
}
