import { ParsedToken, User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { auth } from "./firebaseClient";

export function useUser() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
}

export function useClaims(user: User) {
  const [claims, setClaims] = useState<ParsedToken>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const claim = getIdTokenResult(user)
        .then((res) => res.claims)
        .then((claim) => {
          setClaims(claim);
          setIsLoading(false);
        });
    } else {
      setClaims(null);
      setIsLoading(false);
    }
  }, [user]);

  return { claims, isLoading };
}
