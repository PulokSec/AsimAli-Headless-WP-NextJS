import Document, { Html, Head, Main, NextScript } from "next/document";


const MyDocument = () => {

   

  return (
    <Html lang="en-US">
        <Head>
        
         <noscript>
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fasd) }}
        /> */}
        </noscript>
            
            {/* <link type="image/webp" rel="preload" as="image" href="/home-banner.webp" /> */}


            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/favicon.ico"></link>

            {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
            <meta name="msapplication-TileColor" content="#da532c" />
            {/* <meta name="msapplication-TileImage" content="/mstile-144x144.png" /> */}
            <meta name="theme-color" content="#ffffff" />
            
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}

export default MyDocument