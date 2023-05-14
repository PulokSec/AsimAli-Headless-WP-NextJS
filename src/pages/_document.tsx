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
            <link
              rel="preload"
              href="https://hf0ak2tn748admnnhp68zwih3.js.wpenginepowered.com/_next/static/media/revicons.ff59b316.woff"
              crossOrigin="anonymous"
            />
            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap"  />
            <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" /></noscript>
            
            <link rel="dns-prefetch" href="https://asimaliprod.wpengine.com" />
            <link type="image/webp" rel="preload" as="image" href="/home-banner.webp" />


            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/logo.png"></link>

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
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