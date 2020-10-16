import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import fetch from 'isomorphic-unfetch'
import cookies from 'next-cookies'
import '../styles/login.css'
import App, { Container } from "next/app";
import UserProvider from '../components/UserContext';

export default function MyApp({Component, pageProps}) {

 /* MyApp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    // Calls `getInitialProps` and fills `appProps.pageProps`
    let error;
    const appProps = await App.getInitialProps(appContext);
  
    const { firebaseToken } = cookies(ctx);
  
    if (firebaseToken) {
      try {
        const headers = {
          'Context-Type': 'application/json',
          Authorization: JSON.stringify({ token: firebaseToken }),
        };
        const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
        return { ...result, ...appProps };
      } catch (e) {
        console.log(e);
      }
    }
    return { ...appProps };
  };
*/

  return<UserProvider><Component {...pageProps} /></UserProvider>
}
