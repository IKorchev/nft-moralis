import PaginatedItems from "../../components/Other/PaginatedItems"
import MarketItem from "../../components/Marketplace/MarketItem"
import { useEffect, useState } from "react"
import { filter, sortBy } from "lodash"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { useChain, useMoralis } from "react-moralis"
import { AnimatePresence, motion } from "framer-motion"
import { sortOptions, sortFunction } from "../../utils/sort"
import { FilterIcon } from "@heroicons/react/solid"
import Metadata from "../../components/Other/Metadata"
import Drawer from "../../components/Other/Drawer"
import SortFilterAndClear from "../../components/Other/SortAndFilter/SortFilterAndClear"
import { SectionTitle } from "../../components/SectionTitle"
const Marketplace = () => {
  const { chain, allCollectionsListed, allListings, currentLaunchpad } = useMoralisData()
  const [sortOption, setSortOption] = useState()
  const [filterOption, setFilterOption] = useState()
  const [filterOptions, setFilterOptions] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (allCollectionsListed) {
      //prettier-ignore
      setFilterOptions(allCollectionsListed.map((el) => ({ data: el.attributes.contractAddress,name: el.attributes.collectionName,})))
    }
  }, [allCollectionsListed])

  return (
    <>
      <Metadata title='NFT Explorer - Marketplace' />
      <main className='container mx-auto px-4 py-24 lg:px-0'>
        {/* MOBILE FILTERING DRAWER */}
        <AnimatePresence>
          {open && (
            <Drawer
              open={open}
              setOpen={setOpen}
              ChildElements={
                <SortFilterAndClear
                  sortOption={sortOption}
                  sortOptions={sortOptions}
                  setSortOption={setSortOption}
                  filterOption={filterOption}
                  filterOptions={filterOptions}
                  setFilterOption={setFilterOption}
                />
              }
            />
          )}
        </AnimatePresence>
        <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
          {/* <h1 className='text-4xl font-extrabold  text-white'>Marketplace</h1> */}
          <div className='my-3'>
            <SectionTitle title='Marketplace' />
          </div>
          <button
            className='inline-flex rounded-full p-2 lg:hidden '
            onClick={() => setOpen(!open)}>
            <FilterIcon className='h-6 w-6 text-secondary' />
          </button>
        </div>
        <section aria-labelledby='marketplace-heading' className='pt-6 pb-12'>
          <h2 id='marketplace-heading' className='sr-only'>
            Marketplace
          </h2>
          <div className='flex flex-col justify-center gap-5 lg:flex-row lg:justify-start'>
            {/* Desktop */}
            <div className='hidden lg:flex'>
              <SortFilterAndClear
                sortOption={sortOption}
                sortOptions={sortOptions}
                setSortOption={setSortOption}
                filterOption={filterOption}
                filterOptions={filterOptions}
                setFilterOption={setFilterOption}
              />
            </div>
            <div>
              <PaginatedItems
                items={filter(
                  sortBy(allListings, (object) => sortFunction(object, sortOption)),
                  (el) => (filterOption ? el.attributes.nftContract === filterOption : el)
                )}
                itemsPerPage={15}
                renderItem={renderItem}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const ChangeNetwork = () => {
  const { switchNetwork } = useChain()
  const { authenticate } = useMoralis()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='grid h-[70vh] place-items-center'>
      <button
        className='rounded-lg bg-secondary p-3 text-lg'
        onClick={async () => {
          await authenticate()
          switchNetwork("0x3")
        }}>
        Switch to ropsten
      </button>
    </motion.div>
  )
}

const renderItem = (el, i) => (
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
)

export default Marketplace
