import { ParsedToken, User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "./firebaseClient";
import { onSnapshot, doc } from "firebase/firestore";

export function useUser(uid?: string) {
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

  return { data: user, isLoading };
}

export function useSender(uid: string) {
  const [user, setUser] = useState<Sender>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`api/users/${uid}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      });
  }, [uid]);

  return { data: user, isLoading };
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

  return { data: claims, isLoading };
}

export function useMessages(uid: string) {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const { data, error, isLoading } = useSWR(`/api/messages/${uid}`, fetcher);
  // console.log("data:", data);
  const [data, setData] = useState<Messages>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(db, `messages`, uid as string), (snapshot) => {
      const data = snapshot.data();
      setData(data);
      if (isLoading) setIsLoading(false);
    });
    return unsubscribe;
  }, [uid]);

  return { data, isLoading };
}
