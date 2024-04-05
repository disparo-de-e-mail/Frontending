import { Html, Head, Main, NextScript } from 'next/document'
import link from 'next/link'
import React from 'react'

export default function Document(): JSX.Element {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/icon-vivo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
