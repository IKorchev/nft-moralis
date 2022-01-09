import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { useMoralis } from "react-moralis"
import MarketItemCard from "../../components/MarketItemCard"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import { useEffect } from "react"

const Home = () => {
  const { allListings, getItems } = useMoralisData()
  const { Moralis } = useMoralis()
  const { fetchMarketItems } = useMarketInteractions()
  useEffect(() => {
    // fetchMarketItems()
    getItems()
  }, [])
  return (
    <div className='w-full pb-12'>
      <main className='flex-wrap gap-5 items-center justify-center text-center'>
        <h1 className='text-3xl font-semibold text-white my-12'>
          Items on the Marketplace
        </h1>
        <div className='flex flex-row container mx-auto flex-wrap gap-5 items-center justify-center text-center'>
          {allListings.map((el) => (
            <MarketItemCard
              tokenId={parseInt(el.attributes.tokenId)}
              tokenAddress={el.attributes.nftContract}
              price={Moralis.Units.FromWei(el.attributes.price)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
