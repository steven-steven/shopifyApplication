import React from "react";
import { AppProps } from "next/app";
import { AuthProvider } from '../components/hooks/useAuth';
import "../styles/tailwind.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
