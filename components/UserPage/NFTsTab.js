import { Tab } from "@headlessui/react"
import { FilterIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { userNFTs } from "../../store/userSlice"
import NFTCard from "../Cards/NFTCard"
import PaginatedItems from "../Other/PaginatedItems"
import { SectionContainer, SectionTitle } from "../Section"

const NFTsTab = ({ address }) => {
  const [open, setOpen] = useState(false)
  const nfts = useRecoilValue(userNFTs({ address: address }))
  if (!nfts.length || !address) {
    return (
      <div className='grid min-h-[10rem] place-items-center'>
        <h1 className='h1 text-white'> Connect to a network </h1>
      </div>
    )
  }
  return (
    <Tab.Panel
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='styled-scrollbar container mx-auto my-12 overflow-y-auto'>
      <div className='container w-full px-6 pt-24'>
        <div className='relative flex items-baseline justify-between border-b border-gray-200 pb-2'>
          <div>
            <SectionTitle title='Collected NFTs' />
          </div>
          {nfts.length > 0 && (
            <button className='inline-flex rounded-full p-2 lg:hidden ' onClick={() => setOpen(!open)}>
              <FilterIcon className='text-secondary-100 h-6 w-6' />
            </button>
          )}
        </div>
        <section aria-labelledby='nfts-heading' className='pt-6 pb-24'>
          <h2 id='nfts-heading' className='sr-only'>
            Collected NFTs
          </h2>
          <SectionContainer>
            <div className='flex-grow'>
              <PaginatedItems
                isLayoutAnimated={false}
                items={nfts}
                itemsPerPage={18}
                renderItem={(el, i) => {
                  return (
                    <NFTCard
                      index={i}
                      key={`${el.token_uri}#${el.token_address}`}
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
        </section>
      </div>
    </Tab.Panel>
  )
}

export default NFTsTab
