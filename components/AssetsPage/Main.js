import React, { useState } from "react"
import PaginatedItems from "../Other/PaginatedItems"
import { FilterIcon } from "@heroicons/react/solid"
import { sortBy } from "lodash"
import { sortFunction, sortOptions } from "../../utils/sort"
import SectionTitle from "../SectionTitle"
import SectionContainer from "../SectionContainer"
import SortSection from "../Other/SortAndFilter/SortSection"
import ClearFiltersButton from "../Other/SortAndFilter/ClearFiltersButton"
import { useMoralisQuery } from "react-moralis"
import MarketItemCard from "../Cards/MarketItemCard"
import useSWR from "swr"
import { revalidateOptions } from "../../utils/fetcher"

const Main = ({ itemsAvailableForPurchase }) => {
  const [sortOption, setSortOption] = useState(null)
  const [, setFilterOption] = useState(null)
  const [open, setOpen] = useState(false)

  return (
    <div className='container w-full'>
      <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
        <SectionTitle title='NFTs in collection' />
        {itemsAvailableForPurchase.length > 0 && (
          <button
            className='border-secondary-100 bg-primary-700 inline-flex rounded-full border p-2 lg:hidden'
            onClick={() => setOpen(!open)}>
            <FilterIcon className='text-secondary-100 h-6 w-6' />
          </button>
        )}
      </div>
      <section aria-labelledby='section-heading' className='pt-6 pb-24'>
        <h2 id='section-heading' className='sr-only'>
          NFTs in collection
        </h2>
        {itemsAvailableForPurchase.length > 0 ? (
          <SectionContainer>
            {/* Desktop */}
            <div className='hidden lg:flex'>
              <div className='space-y-1'>
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
            </div>

            <div className='flex flex-grow'>
              <PaginatedItems
                items={sortBy(itemsAvailableForPurchase, (object) =>
                  sortFunction(object, sortOption)
                )}
                itemsPerPage={24}
                renderItem={renderItem}
              />
            </div>
          </SectionContainer>
        ) : (
          <h1 className='text-center text-4xl py-12 text-white'>No items found</h1>
        )}
      </section>
    </div>
  )
}

const renderItem = (el, i) => (
  <MarketItemCard
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

export default Main
