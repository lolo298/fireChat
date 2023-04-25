import "@styles/global.scss";
import { AppProps } from "next/app";
import { AuthProvider } from "@components/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
