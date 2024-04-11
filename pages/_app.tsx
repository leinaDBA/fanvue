import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "../themes/lightTheme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any"/>
        </Head>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
}

export default MyApp;
