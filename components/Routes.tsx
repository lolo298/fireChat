import { useRouter } from "next/router";
import { Spinner } from "@components/Spinner";
import { useClaims, useUser } from "@utils/hooks";

export function UserRoute({
  children,
  needAdmin = false,
  needLogged = false,
  needNotLogged = false,
}: UserRouteProps) {
  const [user, userLoading] = useUser();
  const [claims, claimsLoading] = useClaims(user);
  const router = useRouter();
  if (userLoading || claimsLoading) return <Spinner />;

  if (needNotLogged && user?.uid) {
    router.push("/chat");
    return <Spinner />;
  }

  if (needLogged && !user?.uid) {
    router.push("/login");
    return <Spinner />;
  }
  if (needAdmin && claims.role !== "admin") {
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
