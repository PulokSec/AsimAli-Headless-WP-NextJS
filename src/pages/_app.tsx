import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import React, { useEffect } from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import Script from "next/script";
import { TRACKING_ID } from "./../../utils/variables";

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${TRACKING_ID}');
          `,
        }}
      />
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}



