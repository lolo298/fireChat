import { User } from "firebase/auth";

export function isLoggedIn(user: User | null): boolean {
  return user !== null;
}

export function isAdmin(user: User | null): boolean {
  return isLoggedIn(user) && user.email === "admin@localhost";
}
