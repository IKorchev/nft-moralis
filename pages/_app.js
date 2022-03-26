import { RecoilRoot } from "recoil"
import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout/Layout"
import Queries from "../components/Providers/MoralisDataProvider"
import { AnimatePresence } from "framer-motion"
import Moralis from "moralis"
import { useEffect } from "react"
import { SWRConfig } from "swr"
import { ToastContainer } from "react-toastify"
import { NftProvider } from "use-nft"
import { ethersConfig } from "../utils/config"


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
<<<<<<< HEAD
        <MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
          <Queries />
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
=======
        <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
          <MoralisDataProvider>
            <Layout>
              <AnimatePresence>
                <NftProvider fetcher={["ethers", ethersConfig]}>
                  <Component {...pageProps} />
                </NftProvider>
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
>>>>>>> 3e14d59f64311613f75743264b7ac6aa764157e4
        </MoralisProvider>
      </DAppProvider>
    </RecoilRoot>
  )
}

export default MyApp
