import { motion } from "framer-motion"
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
        content='https://i.ibb.co/frZB8GS/Crypto-Page-Final.png'
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
        content='https://i.ibb.co/frZB8GS/Crypto-Page-Final.png'
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
      <meta property='og:image' content='https://i.ibb.co/frZB8GS/Crypto-Page-Final.png' />
      {/* TWITTER */}
      <meta name='twitter:card' content='https://i.ibb.co/frZB8GS/Crypto-Page-Final.png' />
      <meta property='twitter:domain' content='nft-moralis.vercel.app' />
      <meta property='twitter:url' content='https://nft-moralis.vercel.app/' />
      <meta name='twitter:title' content='Ropsten NFT Marketplace' />
      <meta
        name='twitter:description'
        content='NFT Marketplace and Launchpad built with Moralis. Uses a smart contract deployed on the 
      ROPSTEN testnet. Trade NFTs'
      />
      <meta name='twitter:image' content='https://i.ibb.co/frZB8GS/Crypto-Page-Final.png' />
    </Head>
  )
}

const Home = () => {
  return (
    <>
      <Metadata />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='landing-page relative '>
        <div className='absolute top-0 right-24 z-0 '>
          <Illustration className='h-[700px] w-full opacity-10 lg:h-full lg:opacity-100' />
        </div>
        <LandingPage />
        <LandingPage2 />
      </motion.div>
    </>
  )
}

export default Home
