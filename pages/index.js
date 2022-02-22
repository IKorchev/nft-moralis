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
    </Head>
  )
}

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='landing-page relative '>
      <Metadata />
      <div className='absolute top-0 right-24 z-0 '>
        <Illustration className='opacity-10 lg:opacity-100 h-[700px] w-full lg:h-full' />
      </div>
      <LandingPage />
      <LandingPage2 />
    </motion.div>
  )
}

export default Home
