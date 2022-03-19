import { RecoilRoot } from "recoil"
import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout/Layout"
import MoralisDataProvider from "../components/Providers/MoralisDataProvider"
import { AnimatePresence } from "framer-motion"
import Moralis from "moralis"
import { useEffect } from "react"
import { SWRConfig } from "swr"
import { ToastContainer } from "react-toastify"

const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"

//prettier-ignore"
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    Moralis.enableWeb3()
  }, [])

  return (
    <RecoilRoot>
      <DAppProvider>
        <SWRConfig
          value={{
            suspense: true,
          }}
        />
        <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
          <MoralisDataProvider>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
                <ToastContainer
                  toastClassName='bg-primary-200 text-white shadow-md shadow-secondary-200/20 border border-secondary-500'
                  progressClassName='bg-gradient-to-r from-secondary-200 to-secondary-600 '
                  position='top-right'
                  theme='dark'
                  draggable={false}
                />
              </AnimatePresence>
            </Layout>
          </MoralisDataProvider>
        </MoralisProvider>
      </DAppProvider>
    </RecoilRoot>
  )
}

export default MyApp
