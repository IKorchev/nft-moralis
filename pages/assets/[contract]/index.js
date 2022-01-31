import { FilterIcon } from "@heroicons/react/solid"
import { sortBy } from "lodash"
import { useRouter } from "next/router"
import { useState } from "react"
import Drawer from "../../../components/Drawer"
import { useMoralisQuery } from "react-moralis"
import CollectionHeader from "../../../components/CollectionHeader"
import MarketItem from "../../../components/Marketplace/MarketItem"
import PaginatedItems from "../../../components/PaginatedItems"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import SortSection from "../../../components/SortAndFilter/SortSection"
import { sortOptions, sortFunction } from "../../../utils/sort"
import ClearFiltersButton from "../../../components/SortAndFilter/ClearFiltersButton"

const Asset = () => {
  const { query } = useRouter()
  const { chain } = useMoralisData()
  const [sortOption, setSortOption] = useState(null)
  const [filterOption, setFilterOption] = useState(null)
  const [open, setOpen] = useState(false)
  //prettier-ignore
  const {data: items,error2, isLoading2} = useMoralisQuery('MarketItems', q => q.equalTo('nftContract', query?.contract).equalTo('sold', false),[], {live: true})
  const { data: itemsAvailableForPurchase } = useMoralisQuery("MarketItems", (q) =>
    q.equalTo("nftContract", query?.contract).equalTo("sold", false).ascending("price")
  )

  const cheapest = itemsAvailableForPurchase[0]?.attributes?.price
  return (
    <div className='container mx-auto px-6 py-24 text-white'>
      {/* MOBILE DRAWER */}
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
      <CollectionHeader
        chain={chain}
        address={query.contract}
        amountListed={itemsAvailableForPurchase.length || 0}
        floorPrice={cheapest || 0}
      />
      <div className='relative flex items-baseline justify-between pt-24 pb-2 border-b border-gray-200'>
        <h1 className='text-4xl font-extrabold text-white'>NFTs</h1>
        <button
          className='lg:hidden inline-flex p-2 rounded-full bg-primary-700 border border-secondary'
          onClick={() => setOpen(!open)}>
          <FilterIcon className='h-6 w-6 text-secondary' />
        </button>
      </div>
      <section aria-labelledby='section-heading' className='pt-6 pb-24'>
        <h2 id='section-heading' className='sr-only'>
          Section
        </h2>
        <div className='flex flex-col lg:flex-row justify-start gap-5 mx-auto container'>
          {/* Desktop */}
          <div className='w-60 lg:flex hidden flex-col gap-1'>
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
