import "../styles/globals.scss";

import SideNav from "../components/layout/sidenav";

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <SideNav />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
