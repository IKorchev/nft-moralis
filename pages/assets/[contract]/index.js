import { motion } from "framer-motion"
import NFTItem from "../../../components/NFTItem"
import PaginatedItems from "../../../components/PaginatedItems"
import { formatImage } from "../../../utils/common"
import { useRouter } from "next/router"
import { useState } from "react"
import { useChain } from "react-moralis"
import Moralis from "moralis"
import useSWR from "swr"
import CollectionHeader from "../../../components/CollectionHeader"

const fetcher = async ({ args }) => {
  const { address, chain, offset } = args
  const nfts = await Moralis.Web3API.token.getAllTokenIds({ address, chain, offset })
  if (!collectionData || !nfts) throw new Error("Couldnt get data")
  if (!nfts) throw new Error("Couldn't fetch NFTs")
  return nfts
}

const Asset = () => {
  const { query } = useRouter()
  const { chain } = useChain()
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error, isValidating } = useSWR(
    {
      url: "null",
      args: { address: query?.contract, chain: chain?.chainId, offset: offset },
    },
    fetcher
  )

  return (
    <motion.div exit={{ opacity: 0, scaleY: 0 }} className='py-24 text-white'>
      <CollectionHeader chain={chain} address={query.contract} />
      <div className='flex flex-wrap gap-5 items-center justify-center p-12'>
        <button
          onClick={(e) => {
            e.preventDefault()
            const pagesCount = parseInt(data?.nfts.total) / data?.nfts.page_size
            console.log(pagesCount)
            console.log(offset)
            setOffset((prev) => {
              if (prev < parseInt(data?.nfts.total)) {
                return prev + 500
              }
            })
          }}>
          Load more
        </button>
        <PaginatedItems
          itemsPerPage={50}
          items={data?.nfts?.result}
          renderItem={(el, i) => (
            <NFTItem
              tokenId={el.token_id}
              key={el.token_uri}
              tokenUri={formatImage(el.token_uri)}
              metadata={el.metadata}
              tokenAddress={el.token_address}
            />
          )}
        />
      </div>
    </motion.div>
  )
}

export default Asset
