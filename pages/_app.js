import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import fetch from 'isomorphic-unfetch';
import cookies from 'next-cookies';
import '../styles/login.css';
import '../styles/profile.css';
import '../styles/projects.css';
import '../styles/dashboard.css';
import '../styles/header.css';
import '../styles/team.css';
import '../styles/landing.css';
import '../styles/about.css';
import App, { Container } from 'next/app';
import UserProvider from '../components/UserContext';
import Head from 'next/head';

const dev = process.env.NODE_ENV === 'development';

const server = dev
  ? 'http://localhost:3000'
  : 'https://mat-projekt.vercel.app/';

export default function MyApp(appContext) {
  const { Component, pageProps } = appContext;
  return (
    <UserProvider initialUser={appContext.user}>
      <Head>
        <title>Maturitní projekt</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  let error;
  const appProps = await App.getInitialProps(appContext);

  const { firebaseToken } = cookies(ctx);

  if (firebaseToken) {
    try {
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ token: firebaseToken }),
      };
      const result = await fetch(`${server}/api/validate`, {
        headers,
      }).then((res) => res.json());
      return { ...result, ...appProps };
    } catch (e) {
      console.log(e);
    }
  }
  return { ...appProps };
};
