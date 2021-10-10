import Head from "next/head"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import Search from "../components/Search"
import Progress from "react-progressbar"
import Alert from "../components/Alert"
import NFTList from "../components/NFTList"

const Home = ({ data }) => {
  const { Moralis } = useMoralis()
  const [nfts, setNFTs] = useState(data)
  const [searchTerm, setSearchTerm] = useState("")
  const [chain, setChain] = useState("")
  const [isAlertShown, setIsAlertShown] = useState(false)
  const [progress, setProgress] = useState({
    color: "#7de2d1",
    now: 1,
  })
  useEffect(() => {}, [])
  const showAlert = () => {
    setIsAlertShown(true)
    setTimeout(() => setIsAlertShown(false), 3000)
    return clearTimeout()
  }
  //init moralis plugin
  useEffect(async () => {
    try {
      await Moralis.initPlugins()
    } catch (error) {
      console.log(error)
    }
    return setProgress((old) => ({ ...old, now: 100 }))
  }, [])
  //fetch data
  const fetchNFTs = async (query, chain, amount) => {
    setProgress((old) => ({ ...old, now: 0 }))
    setIsAlertShown(false)
    try {
      const options = {
        q: query,
        filter: "name",
        chain: chain || "",
        limit: "10",
        offset: amount,
      }
      const NFTs = await Moralis.Web3API.token.searchNFTs(options)
      setNFTs(NFTs)
      setProgress(() => ({ now: 100, color: "#7de2d1" }))
    } catch (error) {
      showAlert()
      setProgress(() => ({ now: 100, color: "#f4727d" }))
    }
  }

  return (
    <div className='w-full bg-gradient-to-l from-primary to-primary-900   pb-12'>
      <div className='h-1 overflow-hidden'>
        <Progress color={progress.color} completed={progress.now} />
      </div>
      <Alert isAlertShown={isAlertShown} setIsAlertShown={setIsAlertShown} />
      <Head>
        <title>NFT Explorer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col text-center'>
        <Search
          searchHandler={fetchNFTs}
          term={searchTerm}
          setTerm={setSearchTerm}
          chain={chain}
          setChain={setChain}
        />
        <NFTList list={nfts} />
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
