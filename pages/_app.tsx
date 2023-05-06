import * as React from 'react';
import type { AppProps } from 'next/app'
import '../styles/reset.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp