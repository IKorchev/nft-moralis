import { AnimatePresence } from "framer-motion"
import { FilterIcon } from "@heroicons/react/solid"
import { sortBy } from "lodash"
import { useRouter } from "next/router"
import { useState } from "react"
import { useMoralisQuery } from "react-moralis"
import CollectionHeader from "../../../components/CollectionHeader"
import Drawer from "../../../components/Drawer"
import MarketItem from "../../../components/Marketplace/MarketItem"
import PaginatedItems from "../../../components/PaginatedItems"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import ClearFiltersButton from "../../../components/SortAndFilter/ClearFiltersButton"
import SortSection from "../../../components/SortAndFilter/SortSection"
import { sortFunction, sortOptions } from "../../../utils/sort"

const Asset = () => {
  const { query } = useRouter()
  const { chain } = useMoralisData()
  const [sortOption, setSortOption] = useState(null)
  const [filterOption, setFilterOption] = useState(null)
  const [open, setOpen] = useState(false)
  //prettier-ignore
  const {data: items, error2, isLoading2} =
  useMoralisQuery('MarketItems', q => q
  .equalTo('nftContract', query?.contract)
  .equalTo('sold', false),[query?.contract], {live: true})
  const { data: itemsAvailableForPurchase } = useMoralisQuery(
    "MarketItems",
    (q) => q.equalTo("nftContract", query?.contract).equalTo("sold", false).ascending("price"),
    [query?.contract],
    { live: true }
  )

  const cheapest = itemsAvailableForPurchase[0]?.attributes?.price
  return (
    <div className='container mx-auto px-4 py-24 text-white lg:px-0'>
      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <Drawer
            open={open}
            setOpen={setOpen}
            ChildElements={
              <div className='flex flex-col gap-1'>
                <SortSection
                  defaultOpen={true}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  sortOptions={sortOptions}
                />
                <ClearFiltersButton
                  setSortOption={setSortOption}
                  setFilterOption={setFilterOption} // just for the button - doesn't do anything, there are no filters here
                />
              </div>
            }
          />
        )}
      </AnimatePresence>
      <CollectionHeader
        chain={chain}
        address={query.contract}
        amountListed={itemsAvailableForPurchase.length || 0}
        floorPrice={cheapest || 0}
      />
      <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
        <h1 className='text-4xl font-extrabold text-white'>NFTs</h1>
        <button
          className='inline-flex rounded-full border border-secondary bg-primary-700 p-2 lg:hidden'
          onClick={() => setOpen(!open)}>
          <FilterIcon className='h-6 w-6 text-secondary' />
        </button>
      </div>
      <section aria-labelledby='section-heading' className='pt-6 pb-24'>
        <h2 id='section-heading' className='sr-only'>
          Section
        </h2>
        <div className='container mx-auto flex flex-col justify-start gap-5 lg:flex-row'>
          {/* Desktop */}
          <div className='hidden w-60 flex-col gap-1 lg:flex'>
            <SortSection
              defaultOpen={true}
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortOptions={sortOptions}
            />
            <ClearFiltersButton
              setSortOption={setSortOption}
              setFilterOption={setFilterOption} // just for the button - doesn't do anything, there are no filters here
            />
          </div>

          <div className=''>
            <PaginatedItems
              items={sortBy(items, (object) => sortFunction(object, sortOption))}
              itemsPerPage={12}
              renderItem={renderItem}
            />
          </div>
        </div>
      </section>
    </div>
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

export default Asset
