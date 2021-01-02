import React from "react";
import { AppProps } from "next/app";
import { AuthProvider } from '../components/hooks/useAuth';
import "../styles/tailwind.scss";
import { RepositoryProvider } from '../components/context/repositoryContext'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RepositoryProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RepositoryProvider>
  );
}

export default MyApp;
