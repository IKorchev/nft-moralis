import React, { useState } from "react"
import PaginatedItems from "../Other/PaginatedItems"
import { FilterIcon } from "@heroicons/react/solid"
import SectionTitle from "../SectionTitle"
import SectionContainer from "../SectionContainer"
import SortSection from "../Other/SortAndFilter/SortSection"
import MarketItemCard from "../Cards/MarketItemCard"

const Main = ({ itemsAvailableForPurchase }) => {
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
                <SortSection />
                {/* <ClearFiltersButton /> */}
              </div>
            </div>

            <div className='flex flex-grow'>
              <PaginatedItems
                items={itemsAvailableForPurchase}
                itemsPerPage={25}
                renderItem={(el, i) => (
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
                )}
              />
            </div>
          </SectionContainer>
        ) : (
          <h1 className='py-12 text-center text-4xl text-white'>No items found</h1>
        )}
      </section>
    </div>
  )
}

export default Main
