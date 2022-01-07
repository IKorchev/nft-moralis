import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import MarketItemCard from "../../components/MarketItemCard"
const Home = () => {
  const { allListings } = useMoralisData()
  return (
    <div className='w-full pb-12'>
      <main className='flex flex-row flex-wrap gap-5 items-center justify-center text-center'>
        {allListings.map((el) => (
          <MarketItemCard
            tokenId={parseInt(el.attributes.tokenId)}
            tokenAddress={el.attributes.nftContract}
          />
        ))}
      </main>
    </div>
  )
}
// address: "0xe6f1a815c66bac5f1d59f802bb2a73aa77b36621"
// block_hash: "0x8742ec4f743a49517717d8d46c8bfae48182fba8af997bbcef27d3bc56106f2c"
// block_number: 11720257
// block_timestamp: Thu Dec 30 2021 19:43:55 GMT+0000 (Greenwich Mean Time) {}
// confirmed: true
// createdAt: Thu Dec 30 2021 22:00:45 GMT+0000 (Greenwich Mean Time) {}
// itemId: "1"
// log_index: 9
// nftContract: "0x270cc76efcaed26308cf1919f0148e716b1cca83"
// owner: "0x0000000000000000000000000000000000000000"
// price: "1000000"
// seller: "0x910111ecd2377662f98d5b8d735539a4157b8a83"
// sold: true
// tokenId: "11"
// transaction_hash: "0xa7e0e6f6dbec22d3a6d5b9b7c8375e6e8ec3440881ad748f54d061aaf71fd1c4"
// transaction_index: 11
export default Home
