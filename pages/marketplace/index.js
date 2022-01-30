import PaginatedItems from "../../components/PaginatedItems"
import Loading from "../../components/Loading"
import MarketItem from "../../components/Marketplace/MarketItem"
import { useState } from "react"
import { sortBy, uniqBy } from "lodash"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { useChain, useMoralisQuery } from "react-moralis"
import { motion } from "framer-motion"
import SortSection from "../../components/SortSection"

const sortOptions = [
  { name: "Newest first", data: "date-desc" },
  { name: "Oldest first", data: "date-asc" },
  { name: "Price: Low to High", data: "price-asc" },
  { name: "Price: High to Low", data: "price-desc" },
]

const sortFunction = (object, attribute) => {
  switch (attribute) {
    case "price-asc":
      return object.attributes.price
    case "price-desc":
      return -object.attributes.price
    case "date-asc":
      return object.createdAt
    case "date-desc":
      return -object.createdAt
  }
}

const Home = () => {
  const { chain } = useMoralisData()
  const [sortOption, setSortOption] = useState("date-desc")

  //prettier-ignore
  const {data: allListings,error,isFetching,isLoading} = useMoralisQuery("MarketItems",(q) => q.descending('createdAt'),[],{live: true,})

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
    <main className='container mx-auto px-6 lg:px-24'>
      <div className='relative z-10 flex items-baseline justify-between pt-24 pb-2 border-b border-gray-200'>
        <h1 className='text-4xl font-extrabold  text-white'>Marketplace</h1>
      </div>
      <section aria-labelledby='marketplace-heading' className='pt-6 pb-24'>
        <h2 id='marketplace-heading' className='sr-only'>
          Marketplace
        </h2>
        <div className='flex flex-col lg:flex-row justify-start gap-5'>
          {/* Desktop */}
          <div className='w-60 hidden xl:flex'>
            <SortSection
              defaultOpen={true}
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortOptions={sortOptions}
            />
          </div>
          <div className=''>
            <PaginatedItems
              items={sortBy(
                uniqBy(
                  allListings,
                  (el) => el.attributes.tokenId || el.attributes.nftContract
                ),
                (object) => sortFunction(object, sortOption)
              )}
              itemsPerPage={12}
              renderItem={(el, i) => (
                <MarketItem
                  createdAt={el.createdAt}
                  price={el.attributes.price}
                  tokenUri={el.tokenUri}
                  tokenId={el.attributes.tokenId}
                  nftContract={el.attributes.nftContract}
                  index={i}
                  itemId={el.attributes.itemId}
                  sold={el.attributes.sold}
                  key={el.attributes.itemId}
                />
              )}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

const ChangeNetwork = () => {
  const { switchNetwork } = useChain()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='grid place-items-center h-[70vh]'>
      <button
        className='bg-secondary p-3 text-lg rounded-lg'
        onClick={() => switchNetwork("0x3")}>
        Switch to ropsten
      </button>
    </motion.div>
  )
}

export default Home
