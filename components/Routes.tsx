import { AuthContext } from "@utils/context";
import { useContext } from "react";

export function UserRoute({ children }) {
  const userContext = useContext(AuthContext);
  console.log(userContext);
  if (!userContext) {
    return <h1>Not logged in</h1>;
  }

  return <>{children}</>;
}
