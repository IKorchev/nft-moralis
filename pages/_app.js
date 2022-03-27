import Moralis from "moralis"
import Queries from "../components/Providers/MoralisDataProvider"
import Layout from "../components/Layout/Layout"
import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import { RecoilRoot } from "recoil"
import { AnimatePresence } from "framer-motion"
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
        <MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
          <Queries />
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <NftProvider fetcher={["ethers", ethersConfig]}>
                <Component {...pageProps} />
                <ToastContainer
                  toastClassName='bg-primary-200 text-white shadow-md shadow-secondary-200/20 border border-secondary-500'
                  progressClassName='bg-gradient-to-r from-secondary-200 to-secondary-600 '
                  position='top-right'
                  theme='dark'
                  draggable={false}
                />
              </NftProvider>
            </AnimatePresence>
          </Layout>
        </MoralisProvider>
      </DAppProvider>
    </RecoilRoot>
  )
}

export default MyApp
