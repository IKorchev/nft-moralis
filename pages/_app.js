import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { Provider } from "react-redux"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout/Layout"
import MoralisDataProvider from "../components/Providers/MoralisDataProvider"
import { AnimatePresence } from "framer-motion"
import Moralis from "moralis"
import { useEffect } from "react"
import store from "../store/store"
const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"

//prettier-ignore"
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    Moralis.enableWeb3()
  }, [])

  return (
    <DAppProvider>
      <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
        <MoralisDataProvider>
          <Provider store={store}>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </Provider>
        </MoralisDataProvider>
      </MoralisProvider>
    </DAppProvider>
  )
}

export default MyApp
