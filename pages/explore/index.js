import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { useChain, useMoralisQuery } from "react-moralis"
import { motion } from "framer-motion"
import PaginatedItems from "../../components/PaginatedItems"
import Loading from "../../components/Loading"
import MarketItem from "../../components/MarketItem"
const Home = () => {
  const { chain } = useMoralisData()
  const {
    data: allListings,
    error,
    isFetching,
    isLoading,
  } = useMoralisQuery("MarketItems", (q) => q.equalTo("confirmed", true), [], {
    live: true,
  })

  if (chain?.chainId !== "0x3") return <ChangeNetwork />
  if (error) return null
  if (isFetching || isLoading) {
    return (
      <Loading
        containerProps={{ className: "h-[50vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 100, color: "white" }}
      />
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full pb-12'>
      <main className='flex-wrap gap-5 items-center justify-center text-center'>
        <h1 className='text-3xl font-semibold text-white py-12'>
          Items on the Marketplace
        </h1>
        <div className='flex flex-row container mx-auto flex-wrap gap-5 items-center justify-center text-center'>
          <PaginatedItems
            items={allListings}
            itemsPerPage={15}
            renderItem={(el, i) => {
              const { price, nftContract, tokenId, itemId, sold } = el.attributes
              return (
                <MarketItem
                  price={price}
                  key={i}
                  nftContract={nftContract}
                  index={i}
                  itemId={itemId}
                  tokenId={tokenId}
                  sold={sold}
                />
              )
            }}
          />
        </div>
      </main>
    </motion.div>
  )
}

const ChangeNetwork = () => {
  const { switchNetwork } = useChain()

  return (
    <motion.div exit={{ opacity: 0 }} className='grid place-items-center h-[70vh]'>
      <button
        className='bg-pinkish p-3 text-lg rounded-lg'
        onClick={() => switchNetwork("0x3")}>
        Switch to ropsten
      </button>
    </motion.div>
  )
}

export default Home
