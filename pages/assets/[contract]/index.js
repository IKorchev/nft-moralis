import { AnimatePresence, motion } from "framer-motion"
import NFTItem from "../../../components/NFTItem"
import PaginatedItems from "../../../components/PaginatedItems"
import { formatImage } from "../../../utils/common"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useChain } from "react-moralis"
import Moralis from "moralis"
import useSWR from "swr"
import CollectionHeader from "../../../components/CollectionHeader"

const fetcher = async ({ args }) => {
  const { address, chain, offset } = args
  const nfts = await Moralis.Web3API.token.getAllTokenIds({
    address,
    chain,
    offset,
    limit: 50,
  })
  if (!nfts) throw new Error("Couldnt get data")
  return nfts
}

const Asset = () => {
  const { query } = useRouter()
  const { chain } = useChain()
  const [offset, setOffset] = useState(0)
  const containerRef = useRef()
  const { data, error, isValidating } = useSWR(
    {
      url: "null",
      args: {
        address: query?.contract,
        chain: chain?.chainId,
        offset: offset,
        limit: 50,
      },
    },
    fetcher
  )
  console.log(data)
  return (
    <div className='py-24 text-white'>
      <CollectionHeader chain={chain} address={query.contract} />
      <div
        ref={containerRef}
        className='container mx-auto flex flex-wrap gap-5 items-center justify-center py-12 px-0 lg:px-12'>
        {data?.result.map((el) => (
          <NFTItem
            tokenId={el.token_id}
            key={el.token_uri}
            tokenUri={formatImage(el.token_uri)}
            metadata={el.metadata}
            tokenAddress={el.token_address}>
            <div className='p-3'>
              <p>#{el.token_id}</p>
            </div>
          </NFTItem>
        ))}
      </div>
      <div className='flex justify-center'>
        <button
          className='bg-secondary p-2 rounded-md'
          onClick={(e) => {
            e.preventDefault()
            containerRef.current.scrollIntoView()
            setOffset((prev) => {
              if (prev < parseInt(data?.total)) {
                return prev + data?.page_size
              }
            })
          }}>
          Load more
        </button>
      </div>
    </div>
  )
}

export default Asset
