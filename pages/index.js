import Head from "next/head"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Transfer } from "react-moralis"
import NFTCard from "../components/NFTCard"
import { truncate } from "../utils/common"
import { useEthers } from "@usedapp/core"
const Home = ({ data }) => {
  const [nfts, setNFTs] = useState(data.result)
  const { Moralis } = useMoralis()
  const { account } = useEthers()
  console.log(nfts)
  const fetchNFTs = async (query) => {
    const options = { q: query, filter: "global", limit: "50", chain: "0x1" }
    const NFTs = await Moralis.Web3API.token.searchNFTs(options)
    // console.log(NFTs)
    setNFTs(NFTs.result)
  }

  return (
    <div className='w-full bg-gradient-to-bl from-blue-200 to-purple-300'>
      <Head>
        <title>AVAX Marketplace</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar searchHandler={fetchNFTs} />
      <main className='flex flex-col text-center'>
        <div className='container mx-auto flex flex-wrap justify-evenly mt-12'>
          {nfts.length > 0 &&
            nfts.map((el) => {
              const metadata = JSON.parse(el.metadata)

              return <NFTCard metadata={el} key={metadata.token_uri} />
            })}
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const Moralis = require("moralis/node")

  const result = await fetch(
    ` https://deep-index.moralis.io/api/v2/nft/search?chain=0x1&format=decimal&q=avalanche&filter=global`,
    { headers: { "X-API-KEY": process.env.API_KEY, accept: "application/json" } }
  )
  const data = await result.json()

  return {
    props: {
      data,
    },
  }
}
