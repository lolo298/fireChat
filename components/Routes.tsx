import { useRouter } from "next/router";
import { Spinner } from "@components/Spinner";
import { useClaims, useUser } from "@utils/hooks";
import { Suspense } from "react";

export function UserRoute({
  children,
  needAdmin = false,
  needLogged = false,
  needNotLogged = false,
}: UserRouteProps) {
  const { user, isLoading } = useUser();
  const { claims, isLoading: isLoadingClaims } = useClaims(user);
  const router = useRouter();
  console.log("userLoading", isLoading);
  console.log("claimsLoading", isLoadingClaims);
  if (isLoading || isLoadingClaims) return <Spinner />;

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
