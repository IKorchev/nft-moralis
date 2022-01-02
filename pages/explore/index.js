import Head from "next/head"
import { useEffect, useState } from "react"
import { useMoralisQuery, useWeb3ExecuteFunction, useChain } from "react-moralis"
import Alert from "../../components/Alert"
import MarketItemCard from "../../components/MarketItemCard"
import { MARKET_ABI, MARKET_ADDRESS } from "../../utils/getMarketItems"

const Home = () => {
  const [isAlertShown, setIsAlertShown] = useState(false)
  const { account } = useChain()
  const [marketItems, setMarketItems] = useState([])
  const { data, error, isLoading } = useMoralisQuery("createMarketSale", (q) =>
    q.equalTo("confirmed", true)
  )
  const contractProcessor = useWeb3ExecuteFunction()

  useEffect(() => {
    const getMarketItems = async () => {
      contractProcessor.fetch({
        params: {
          abi: MARKET_ABI,
          contractAddress: MARKET_ADDRESS,
          functionName: "fetchMarketItems",
        },
        onSuccess: (data) => {
          console.log(data)
          setMarketItems(data)
        },
        onError: (error) => console.log(error),
      })
    }
    getMarketItems()
  }, [data])
  return (
    <div className='w-full pb-12'>
      <Alert isAlertShown={isAlertShown} setIsAlertShown={setIsAlertShown} />
      <Head>
        <title>NFT Explorer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-row gap-5 items-center justify-center text-center'>
        {marketItems?.map((el) => {
          return (
            <MarketItemCard
              price={el.price}
              tokenId={el.tokenId}
              tokenAddress={el.nftContract}
              itemId={el.itemId}
            />
          )
        })}
      </main>
    </div>
  )
}

export default Home
