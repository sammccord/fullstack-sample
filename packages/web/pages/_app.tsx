import React from 'react'
import '@sammccord/tailwind/dist/styles.css'
import '../styles/global.css'
import { SWRConfig, ConfigInterface } from 'swr'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { fetcher } from '../lib/fetch'
import Notifications from '../components/Notifications'

const swrConfig: ConfigInterface = {
  shouldRetryOnError: false,
  fetcher
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='keywords' content='Sample,Messages' />
        <meta name='theme-color' content='#b395b2' />
      </Head>
      <DefaultSeo
        title='MSNGR'
        titleTemplate='%s'
        description='Read and leave messages. Timeboxed to 2 days as code sample. This is not intended to be a useful application so dont use it as such.'
        openGraph={{
          defaultImageWidth: 128,
          defaultImageHeight: 134,
          type: 'website',
          locale: 'en_US',
          url: 'https://www.recurse-sample/',
          site_name: 'MSNGR'
        }}
      />
      <SWRConfig value={swrConfig}>
        <Notifications>
          <Component {...pageProps} />
        </Notifications>
      </SWRConfig>
    </>
  )
}

export default MyApp
