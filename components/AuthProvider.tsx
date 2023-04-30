import { AuthContext } from "@utils/context";
import { auth } from "@utils/firebaseClient";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}

interface res {
  user: User | null;
  isLoading: boolean;
}
