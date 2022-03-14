import PaginatedItems from "../../components/Other/PaginatedItems"
import MarketItem from "../../components/Cards/MarketItemCard"
import { Suspense, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { sortOptions } from "../../utils/sort"
import { FilterIcon } from "@heroicons/react/solid"
import Metadata from "../../components/Other/Metadata"
import Drawer from "../../components/Other/Drawer"
import SortFilterAndClear from "../../components/Other/SortAndFilter/SortFilterAndClear"
import SectionTitle from "../../components/SectionTitle"
import SectionContainer from "../../components/SectionContainer"
import { useRecoilValue } from "recoil"
import { launchpadsState } from "../../store/store"
import { filterListings } from "../../store/listingsSlice"

const Marketplace = () => {
  const [sortOption, setSortOption] = useState()
  const [filterOption, setFilterOption] = useState()
  const listings = useRecoilValue(filterListings)
  const filterOptions = useRecoilValue(launchpadsState).map((el) => ({
    data: el.attributes.contractAddress,
    name: el.attributes.collectionName,
  }))
  const [open, setOpen] = useState(false)

  return (
    <>
      <Metadata title='NFT Explorer - Marketplace' />
      <main className='container mx-auto px-4 py-24 lg:px-0'>
        {/* MOBILE FILTERING DRAWER */}
        <AnimatePresence>
          {open && (
            <Drawer open={open} setOpen={setOpen}>
              <SortFilterAndClear
                sortOption={sortOption}
                sortOptions={sortOptions}
                setSortOption={setSortOption}
                filterOption={filterOption}
                filterOptions={filterOptions}
                setFilterOption={setFilterOption}
              />
            </Drawer>
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
            <FilterIcon className='text-secondary-100 h-6 w-6' />
          </button>
        </div>
        <section aria-labelledby='marketplace-heading' className='pt-6 pb-12'>
          <h2 id='marketplace-heading' className='sr-only'>
            Marketplace
          </h2>
          <SectionContainer>
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
            <div className=' w-full '>
              <Suspense fallback={null}>
                <PaginatedItems items={listings} itemsPerPage={15} renderItem={renderItem} />
              </Suspense>
            </div>
          </SectionContainer>
        </section>
      </main>
    </>
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
