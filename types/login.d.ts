declare interface loginProps {
  redirect: boolean;
  destination: string;
}
declare interface loginRes {
  success: boolean;
  id?: string;
  message?: string;
}

declare interface AuthProviderProps {
  loggedIn?: boolean;
  admin?: boolean;
  children: React.ReactNode;
}
