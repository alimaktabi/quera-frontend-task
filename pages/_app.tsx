import type { AppProps } from "next/app"
import { FC } from "react"
import nProgress from "nprogress"
import { Router } from "next/router"

import "../styles/globals.css"
import "nprogress/nprogress.css"

Router.events.on("routeChangeStart", nProgress.start)

Router.events.on("routeChangeError", nProgress.done)

Router.events.on("routeChangeComplete", nProgress.done)

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
