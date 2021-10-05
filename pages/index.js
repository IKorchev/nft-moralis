import Head from "next/head"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Transfer } from "react-moralis"
import NFTCard from "../components/NFTCard"
import { truncate } from "../utils/common"
const Home = () => {
  const [userNFTS, setUserNFTS] = useState([])
  const { isInitialized, auth, user, authenticate, logout, Moralis } = useMoralis()
  const [walletAddress, setWalletAddress] = useState("")

  const fetchNFTs = async (query) => {
    const options = { q: query, chain: "polygon", filter: "global", limit: "50" }
    const NFTs = await Moralis.Web3API.token.searchNFTs(options)
    // console.log(NFTs)
    setUserNFTS(NFTs.result)
    console.log(NFTs.result)
  }

  return (
    <div className='w-full bg-gradient-to-bl from-blue-100 to-purple-100'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar searchHandler={fetchNFTs} />
      <main className='flex flex-col text-center'>
        <h1 className='font-semibold text-lg'>{walletAddress}</h1>
        <div className='flex flex-wrap justify-evenly mt-12'>
          {userNFTS.length > 0 &&
            userNFTS.map((el) => {
              const metadata = JSON.parse(el.metadata)
              const { image, name, description, token_uri } = metadata
              let newimg
              metadata.image === null && <></>
              if (image?.startsWith("ipfs") || image === null) {
                // newimg = image?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")
                newimg =
                  "https://thumbs.dreamstime.com/b/image-unavailable-icon-simple-illustration-129166551.jpg"
              } else {
                newimg = image
              }

              return (
                <NFTCard
                  key={token_uri}
                  img={newimg}
                  name={name.substring(0, 20)}
                  description={
                    typeof description === "string"
                      ? description.substring(0, 60)
                      : "Description is not available for this NFT"
                  }
                  token_address={el.token_address}
                  token_uri={el.token_uri}
                  token_id={el.token_id}
                />
              )
            })}
        </div>
      </main>
    </div>
  )
}

export default Home
