import { AuthContext } from "@utils/context";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Spinner } from "@components/Spinner";

export function UserRoute({
  children,
  needAdmin = false,
  needLogged = false,
  needNotLogged = false,
}: UserRouteProps) {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  if (needNotLogged && !isLoading && user?.uid) {
    router.push("/chat");
    return <Spinner />;
  }

  if (needLogged && !isLoading && !user?.uid) {
    router.push("/login");
    return <Spinner />;
  }

  // if (needAdmin && !isLoading && user?.uid && !user.claims.admin) {
  //   router.push("/chat");
  //   return <Spinner />;
  // }

  return <>{isLoading ? <Spinner /> : children}</>;
}

interface UserRouteProps {
  children: React.ReactNode;
  needAdmin?: boolean;
  needLogged?: boolean;
  needNotLogged?: boolean;
}
