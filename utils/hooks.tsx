import { ParsedToken, User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "./firebaseClient";
import { onSnapshot, doc } from "firebase/firestore";

export function useUser(): [User, boolean] {
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
  return [user, isLoading];
}

export function useSender(uid: string): [Sender, boolean] {
  const [user, setUser] = useState<Sender>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    fetch(`api/users/${uid}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      });
  }, [uid]);
  return [user, isLoading];
}

export function useClaims(user: User): [ParsedToken, boolean] {
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
  return [claims, isLoading];
}

export function useMessages(uid: string): [Messages, boolean] {
  const [data, setData] = useState<Messages>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(db, `Messages`, uid as string), (snapshot) => {
      const data = snapshot.data();
      setData(data);
      if (isLoading) setIsLoading(false);
    });
    return unsubscribe;
  }, [uid]);
  return [data, isLoading];
}
