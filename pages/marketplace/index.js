import { AnimatePresence } from "framer-motion"
import { Suspense, useState } from "react"
import { MdSort } from "react-icons/md"
import { useRecoilValue } from "recoil"
import MarketItem from "../../components/Cards/MarketItemCard"
import Drawer from "../../components/Other/Drawer"
import Metadata from "../../components/Other/Metadata"
import PaginatedItems from "../../components/Other/PaginatedItems"
import SortItemsBy from "../../components/Other/SortItemsBy"
import { SectionContainer, SectionTitle } from "../../components/Section"
import { sortedListings } from "../../store/listingsSlice"

const Marketplace = () => {
  const listings = useRecoilValue(sortedListings)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='container mx-auto px-4 py-24 lg:px-0'>
        <Metadata title='NFT Explorer - Marketplace' />
        {/* MOBILE SORTING DRAWER */}
        <AnimatePresence>
          {open && (
            <Drawer open={open} setOpen={setOpen}>
              <SortItemsBy />
            </Drawer>
          )}
        </AnimatePresence>
        <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
          {/* <h1 className='text-4xl font-extrabold  text-white'>Marketplace</h1> */}
          <div className='my-3'>
            <SectionTitle title='Marketplace' />
          </div>
          <button className='inline-flex rounded-full p-2 lg:hidden ' onClick={() => setOpen(!open)}>
            <MdSort className='text-secondary-100 h-8 w-8' />
          </button>
        </div>
        <section aria-labelledby='marketplace-heading' className='pt-6 pb-12'>
          <h2 id='marketplace-heading' className='sr-only'>
            Marketplace
          </h2>
          <SectionContainer>
            {/* Desktop */}
            <div className='hidden max-h-72 lg:flex'>
              <SortItemsBy />
            </div>
            <div className=' w-full '>
              <Suspense fallback={null}>
                <PaginatedItems
                  items={listings}
                  itemsPerPage={25}
                  renderItem={(el, i) => (
                    <MarketItem
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                      }}
                      createdAt={el.createdAt}
                      price={el.attributes.price}
                      tokenUri={el.tokenUri}
                      tokenId={el.attributes.tokenId}
                      nftContract={el.attributes.nftContract}
                      index={i}
                      itemId={el.attributes.itemId}
                      sold={el.attributes.sold}
                      key={el.createdAt}
                    />
                  )}
                />
              </Suspense>
            </div>
          </SectionContainer>
        </section>
      </div>
    </>
  )
}

export default Marketplace
