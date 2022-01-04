import Head from "next/head"
import { useEffect, useState } from "react"
import { useMoralisQuery, useWeb3ExecuteFunction, useChain } from "react-moralis"
import Alert from "../../components/Alert"
import MarketItemCard from "../../components/MarketItemCard"
import { MARKET_ABI, MARKET_ADDRESS } from "../../utils/NFTABI"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import PaginatedItems from "../../components/PaginatedItems"

const Home = () => {
  const [isAlertShown, setIsAlertShown] = useState(false)
  const { allListings } = useMoralisData()

  useEffect(() => {}, [])
  return (
    <div className='w-full pb-12'>
      <Alert isAlertShown={isAlertShown} setIsAlertShown={setIsAlertShown} />
      <main className='flex flex-row gap-5 items-center justify-center text-center'>
        <PaginatedItems items={allListings} itemsPerPage={15} />
      </main>
    </div>
  )
}

export default Home
