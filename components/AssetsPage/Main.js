import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MdSort } from "react-icons/md"
import { SectionContainer, SectionTitle } from "../Section"
import MarketItemCard from "../Cards/MarketItemCard"
import PaginatedItems from "../Other/PaginatedItems"
import SortItemsBy from "../Other/SortItemsBy"
import Drawer from "../Other/Drawer"

const Main = ({ itemsAvailableForPurchase }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='container w-full'>
      <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
        <SectionTitle title='NFTs in collection' />
        {itemsAvailableForPurchase.length > 0 ? (
          <button className='inline-flex rounded-full p-2 lg:hidden ' onClick={() => setOpen(!open)}>
            <MdSort className='text-secondary-100 h-8 w-8' />
          </button>
        ) : null}
      </div>
      <section aria-labelledby='section-heading' className='pt-6 pb-24'>
        <h2 id='section-heading' className='sr-only'>
          NFTs in collection
        </h2>
        {itemsAvailableForPurchase.length > 0 ? (
          <SectionContainer>
            {/* Mobile sort drawer*/}
            <AnimatePresence>
              {open && (
                <Drawer open={open} setOpen={setOpen}>
                  <SortItemsBy />
                </Drawer>
              )}
            </AnimatePresence>

            {/* Desktop sort  */}
            <div className='hidden lg:flex'>
              <div className='space-y-1'>
                <SortItemsBy />
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
                    key={`${el.id}`}
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
