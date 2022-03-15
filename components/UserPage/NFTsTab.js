import { Tab } from "@headlessui/react"
import { FilterIcon } from "@heroicons/react/solid"
import { AnimatePresence, motion } from "framer-motion"
import { filter, sortBy, uniqBy } from "lodash"
import React, { Suspense, useState } from "react"
import { useChain } from "react-moralis"
import useSWR from "swr"
import { getNFTsForUser, revalidateOptions } from "../../utils/fetcher"
import NFTCard from "../Cards/NFTCard"
import PaginatedItems from "../Other/PaginatedItems"
import SortFilterAndClear from "../Other/SortAndFilter/SortFilterAndClear"
import SectionContainer from "../SectionContainer"
import SectionTitle from "../SectionTitle"
import Drawer from "../Other/Drawer"
import Loading from "../Other/Loading"

const NFTsTab = ({ query }) => {
  const [open, setOpen] = useState(false)
  const { chain } = useChain()
  const options = {
    url: "noNeedForUrl",
    args: { chain: chain?.chainId, address: query.userAddress },
  }
  const { data, error, isValidating } = useSWR(options, getNFTsForUser, revalidateOptions)
  const collections = uniqBy(data?.result, (token) => token.token_address)
  const filterOptions = collections.map((el) => ({ data: el.token_address, name: el.name }))

  return (
    <div className='container w-full pt-24 '>
      <Tab.Panel as={motion.div} className='px-6' initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }}>
        <div className='relative flex items-baseline justify-between border-b border-gray-200 pb-2'>
          <div>
            <SectionTitle title='Collected NFTs' />
          </div>
          {data?.total && (
            <button className='inline-flex rounded-full p-2 lg:hidden ' onClick={() => setOpen(!open)}>
              <FilterIcon className='text-secondary-100 h-6 w-6' />
            </button>
          )}
        </div>
        <section aria-labelledby='nfts-heading' className='pt-6 pb-24'>
          <h2 id='nfts-heading' className='sr-only'>
            Collected NFTs
          </h2>
          {data?.total > 0 ? (
            <SectionContainer>
              <div className='flex-grow'>
                <PaginatedItems
                  isLayoutAnimated={false}
                  items={data?.result}
                  itemsPerPage={18}
                  renderItem={(el, i) => {
                    return (
                      <NFTCard
                        index={i}
                        key={el.token_uri}
                        tokenUri={el.token_uri}
                        metadata={el.metadata}
                        tokenId={el.token_id}
                        tokenAddress={el.token_address}
                        contractName={el.name}
                      />
                    )
                  }}
                />
              </div>
            </SectionContainer>
          ) : (
            <h2 className='py-12 text-center text-3xl text-gray-100'>No items in this collection</h2>
          )}
        </section>
      </Tab.Panel>
    </div>
  )
}

export default NFTsTab
