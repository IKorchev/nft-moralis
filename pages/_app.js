import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout/Layout"
import { useEffect, useState } from "react"
import MoralisDataProvider from "../components/Providers/MoralisDataProvider"
import Moralis from "moralis"
import { AnimatePresence } from "framer-motion"

const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"

//prettier-ignore"
const MyApp = ({ Component, pageProps }) => {
  const [called, setCalled] = useState(false)
  const start = async () => {
    await Moralis.start({ appId: APP_ID, serverUrl: SERVER_URL })
    setCalled(true)
  }
  useEffect(() => {
    Moralis.enableWeb3()
    start()
  }, [])
  return (
    called && (
      <DAppProvider>
        <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
          <MoralisDataProvider>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </MoralisDataProvider>
        </MoralisProvider>
      </DAppProvider>
    )
  )
}

export default MyApp
