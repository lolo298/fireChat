import { useRouter } from "next/router";
import { Spinner } from "@components/Spinner";
import { useUser } from "@utils/hooks";

export function UserRoute({
  children,
  needAdmin = false,
  needLogged = false,
  needNotLogged = false,
}: UserRouteProps) {
  const { user, isLoading } = useUser();
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
