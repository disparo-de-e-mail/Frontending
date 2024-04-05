import { themeConfig } from '@/provider/theme-config/theme'
import { Defaultlayout } from '@/templates/layout'
import { ThemeContextProvider } from '@telefonica/mistica'
import '@telefonica/mistica/css/mistica.css'
import '@telefonica/mistica/css/reset.css'
import '@telefonica/mistica/css/roboto.css'
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider theme={themeConfig}>
      <Defaultlayout>
        <Component {...pageProps} />
      </Defaultlayout>
    </ThemeContextProvider>
  )
}
