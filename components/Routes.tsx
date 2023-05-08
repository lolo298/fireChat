import { useRouter } from "next/router";
import { Spinner } from "@components/Spinner";
import { useClaims, useUser } from "@utils/hooks";

export function UserRoute({
  children,
  needAdmin = false,
  needLogged = false,
  needNotLogged = false,
}: UserRouteProps) {
  const user = useUser();
  const claims = useClaims(user.data);
  const router = useRouter();
  if (user.isLoading || claims.isLoading) return <Spinner />;

  if (needNotLogged && user.data?.uid) {
    router.push("/chat");
    return <Spinner />;
  }

  if (needLogged && !user.data?.uid) {
    router.push("/login");
    return <Spinner />;
  }
  if (needAdmin && claims.data.role !== "admin") {
    return (
      <>
        <h1>Unauthorized</h1>
      </>
    );
  }

  return <>{children}</>;
}

interface UserRouteProps {
  children: React.ReactNode;
  needAdmin?: boolean;
  needLogged?: boolean;
  needNotLogged?: boolean;
}
