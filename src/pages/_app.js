import { Fragment, FunctionComponent } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ 
    Component, 
    pageProps 
}) {

    return (
        <>
        <Fragment>
        <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="cache-control" content="max-age=0" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta httpEquiv="pragma" content="no-cache" />
        <title>SYF NFT Market</title>
        <meta
          name="description"
          content="Syfin NFT Marketplace - Buy and Sell NFTs on the Fantom Blockchain with SYF"
        />
        <meta property="og:title" content="Syfin NFT Marketplace" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syfin.art/" />
        <meta property="og:image" content="https://syfin.art/hometag.jpg" />
        <meta property="og:description" content="Syfin NFT Market - Mint, Buy, Sell, Gift, and Discover very rare digital assets on the Fantom Blockchain with SYF" />
        <meta property="og:site_name" content="Syfin NFT Marketplace" />
        <meta property="og:locale" content="en_US" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300&family=Roboto:wght@100&display=swap" rel="stylesheet" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <script>window.prerenderReady = false;</script>
        <script src="https://cdn.jsdelivr.net/npm/jdenticon@3.1.1/dist/jdenticon.min.js" async
        integrity="sha384-l0/0sn63N3mskDgRYJZA6Mogihu0VY3CusdLMiwpJ9LFPklOARUcOiWEIGGmFELx">
        </script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
      </Head>
      </Fragment>
      </>
    )
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp