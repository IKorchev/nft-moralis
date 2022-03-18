import { Tab } from "@headlessui/react"
import { FilterIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { userNFTs } from "../../store/userSlice"
import { NftProvider } from "use-nft"
import { getDefaultProvider } from "ethers"
import NFTCard from "../Cards/NFTCard"
import PaginatedItems from "../Other/PaginatedItems"
import SectionContainer from "../SectionContainer"
import SectionTitle from "../SectionTitle"

const ethersConfig = {
  provider: getDefaultProvider("https://speedy-nodes-nyc.moralis.io/a66bbe066b91269ffbcb96b7/eth/ropsten"),
}

const NFTsTab = ({ address }) => {
  const [open, setOpen] = useState(false)
  const nfts = useRecoilValue(userNFTs({ address: address }))

  return (
    <div className='container w-full pt-24 '>
      <Tab.Panel as={motion.div} className='px-6' initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }}>
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
                    <NftProvider fetcher={["ethers", ethersConfig]}>
                      <NFTCard
                        index={i}
                        key={el.token_uri}
                        tokenUri={el.token_uri}
                        metadata={el.metadata}
                        tokenId={el.token_id}
                        tokenAddress={el.token_address}
                        contractName={el.name}
                      />
                    </NftProvider>
                  )
                }}
              />
            </div>
          </SectionContainer>
        </section>
      </Tab.Panel>
    </div>
  )
}

export default NFTsTab
