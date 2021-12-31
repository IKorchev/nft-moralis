import Head from "next/head"
import { useEffect, useState } from "react"
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis"
import Alert from "../../components/Alert"
import MarketItemCard from "../../components/MarketItemCard"
import { MARKET_ABI } from "../../utils/getMarketItems"

const Home = () => {
  const [isAlertShown, setIsAlertShown] = useState(false)
  const { data, error, isLoading } = useMoralisQuery("createMarketSale", (q) =>
    q.equalTo("confirmed", true)
  )

  return (
    <div className='w-full pb-12'>
      <Alert isAlertShown={isAlertShown} setIsAlertShown={setIsAlertShown} />
      <Head>
        <title>NFT Explorer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-row gap-5 items-center justify-center text-center'>
        {data?.map((el) => {
          return (
            <MarketItemCard
              price={el.attributes.price}
              tokenId={el.attributes.tokenId}
              tokenAddress={el.attributes.nftContract}
            />
          )
        })}
      </main>
    </div>
  )
}

export default Home
