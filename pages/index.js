import { AnimatePresence, motion } from "framer-motion"
import Head from "next/head"
import Illustration from "../public/assets/Illustration"
import LandingPage from "../components/LandingPage"
import LandingPage2 from "../components/LandingPage2"
const Metadata = () => {
  return (
    <Head>
      <title>NFT Explorer | Launchpad and Marketplace</title>
      <meta name='title' property='og:title' content='Ropsten NFT Marketplace' />
      <meta
        name='image'
        property='og:image'
        content='https://img001.prntscr.com/file/img001/2NPVnElvSkOTmkZODKueCA.png'
      />
      <meta
        name='description'
        property='og:description'
        content="NFT Marketplace and Launchpad built with Moralis. Uses a smart contract deployed on the 
      ROPSTEN testnet. Trade NFTs'"
      />
      <meta
        name='image'
        property='og:image:secure_url'
        content='https://img001.prntscr.com/file/img001/2NPVnElvSkOTmkZODKueCA.png'
      />
      <meta name='url' property='og:url' content='https://nft-moralis.vercel.app/' />
      <meta name='robots' content='index, follow' />
      <meta name='keywords' content='NFT, Ethereum, Moralis, Launchpad, Marketplace, ropsten' />
      <meta name='author' content='Ivaylo Korchev' />
      {/* FACEBOOK */}
      <meta property='og:url' content='https://nft-moralis.vercel.app/' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Ropsten NFT Marketplace' />
      <meta
        property='og:description'
        content='NFT Marketplace and Launchpad built with Moralis. Uses a smart contract deployed on the 
      ROPSTEN testnet. Trade NFTs'
      />
      <meta
        property='og:image'
        content='https://img001.prntscr.com/file/img001/2NPVnElvSkOTmkZODKueCA.png'
      />
      {/* TWITTER */}
      <meta
        name='twitter:card'
        content='https://img001.prntscr.com/file/img001/2NPVnElvSkOTmkZODKueCA.png'
      />
      <meta property='twitter:domain' content='nft-moralis.vercel.app' />
      <meta property='twitter:url' content='https://nft-moralis.vercel.app/' />
      <meta name='twitter:title' content='Ropsten NFT Marketplace' />
      <meta
        name='twitter:description'
        content='NFT Marketplace and Launchpad built with Moralis. Uses a smart contract deployed on the 
      ROPSTEN testnet. Trade NFTs'
      />
      <meta
        name='twitter:image'
        content='https://img001.prntscr.com/file/img001/2NPVnElvSkOTmkZODKueCA.png'
      />
    </Head>
  )
}

const Home = () => {
  return (
    <>
      <Metadata />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='relative '>
          <LandingPage />
          <LandingPage2 />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Home
