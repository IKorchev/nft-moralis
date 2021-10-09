import Head from "next/head"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import NFTCard from "../components/NFTCard"
import Search from "../components/Search"
import Progress from "react-progressbar"
import Alert from "../components/Alert"

const Home = ({ data }) => {
  const { Moralis } = useMoralis()
  const [nfts, setNFTs] = useState(data.result)
  const [searchTerms, setSearchTerms] = useState()
  const [isAlertShown, setIsAlertShown] = useState(false)
  const [progress, setProgress] = useState({
    color: "#7de2d1",
    now: 1,
  })
  useEffect(async () => {
    try {
      await Moralis.initPlugins()
    } catch (error) {
      console.log(error)
    }
    return setProgress((old) => ({ ...old, now: 100 }))
  }, [])
  const fetchNFTs = async (query, chain) => {
    setProgress((old) => ({ ...old, now: 0 }))
    setIsAlertShown(false)
    try {
      const options = { q: query, filter: "name", limit: "50", chain: chain }
      const NFTs = await Moralis.Web3API.token.searchNFTs(options)
      setNFTs(NFTs.result)
      setSearchTerms({ query })
      setProgress(() => ({ now: 100, color: "#7de2d1" }))
    } catch (error) {
      setIsAlertShown(true)
      setProgress(() => ({ now: 100, color: "#f4727d" }))
    }
  }

  return (
    <div className='w-full bg-gradient-to-bl from-grayish to-gray-900 pb-12'>
      <div className='h-1 overflow-hidden'>
        <Progress color={progress.color} completed={progress.now} />
      </div>

      <Alert isAlertShown={isAlertShown} setIsAlertShown={setIsAlertShown} />
      <Head>
        <title>NFT Explorer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col text-center'>
        <Search searchHandler={fetchNFTs} />
        {searchTerms && (
          <h1 className='text-light mt-12 font-semibold text-3xl'>
            Results for "{searchTerms.query}" on the {searchTerms.chain}
          </h1>
        )}
        <div className='container px-24 mx-auto flex flex-wrap justify-evenly mt-12'>
          {nfts.length > 0 ? (
            nfts.map((el) => {
              const metadata = JSON.parse(el.metadata)
              return <NFTCard metadata={el} key={metadata.token_uri} />
            })
          ) : (
            <div className='flex h-screen'>
              <h1 className='text-2xl text-light text-center'>
                Couldn't find any NFT's. Try using a different keyword or try again later.
              </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const result = await fetch(
    ` https://deep-index.moralis.io/api/v2/nft/search?chain=0x1&format=decimal&q=punk&filter=global&limit=50`,
    { headers: { "X-API-KEY": process.env.API_KEY, accept: "application/json" } }
  )
  const data = await result.json()

  return {
    props: {
      data,
    },
  }
}
