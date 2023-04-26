import { AuthContext } from "@utils/context";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth");
      const data: res = await res.json();
      console.log(data);
      setUser(data.user);
    })();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

interface res {
  user: User | null;
}
