import { AuthContext } from "@utils/context";
import { useContext } from "react";

export function UserRoute({ children, needAdmin = false, needLogged = false }: UserRouteProps) {
  const userContext = useContext(AuthContext);

  if (needLogged && !userContext) {
    return <div>Not logged in</div>;
  }

  // if (needAdmin && !userContext?.isAdmin) {
  //   return <div>Not an admin</div>;
  // }

  return <>{children}</>;
}

interface UserRouteProps {
  children: React.ReactNode;
  needAdmin?: boolean;
  needLogged?: boolean;
}
