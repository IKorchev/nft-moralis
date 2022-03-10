import { AnimatePresence } from "framer-motion"
import { formatChain, formatIpfs } from "../../../utils/common"
import Link from "next/link"
import useSWR from "swr"
import { tokenIdFetcher, revalidateOptions } from "../../../utils/fetcher"
import { FadeLoader } from "react-spinners"
import { shortenIfAddress } from "@usedapp/core"
import { useChain } from "react-moralis"
import ListItemModal from "../../tokenId/ListItemModal"
import { useState } from "react"
import VideoOrImage from "./VideoOrImage"
import Skeleton from "react-loading-skeleton"
import SkeletonCard from "../SkeletonCard/SkeletonCard"

const NFTCard = ({ children, tokenUri, tokenId, tokenAddress, index, ...props }) => {
  const { chain, account } = useChain()
  const [isOpen, setIsOpen] = useState(false)
  const chainString = formatChain(chain?.networkId)
  //prettier-ignore
  const { data, error } = useSWR({url: chain ? "/api/nft" : null,
  args: { contract: tokenAddress,tokenId: tokenId, chain: { chainString: chainString, chainId: chain?.chainId }}},tokenIdFetcher,revalidateOptions)
  let image
  if (data) {
    image =
      formatIpfs(data?.metadata?.image) ||
      formatIpfs(data?.metadata?.image_url) ||
      formatIpfs(data?.metadata?.url)
  }

  if (!image) return <SkeletonCard />
  return (
    <div className='bg-secondary-800  shadow-glass relative flex w-48 flex-col  overflow-hidden rounded-md  text-white lg:w-60'>
      <Link href={`/assets/${tokenAddress}/${tokenId}`}>
        <a className='min-h-60'>
          <VideoOrImage format={data?.metadata?.format} url={image} />
        </a>
      </Link>
      <div className='flex flex-col items-start px-2 py-1'>
        <Link passHref href={`/assets/${tokenAddress}/`}>
          <a>
            <small className='text-[0.7rem] text-white hover:text-gray-300'>
              {shortenIfAddress(tokenAddress)}
            </small>
          </a>
        </Link>
        <Link href={`/assets/${tokenAddress}/${tokenId}`}>
          <p className='font-bold'>{data?.metadata?.name}</p>
        </Link>
        {data?.owner.toLowerCase() === account?.toLowerCase() && (
          <>
            <button
              onClick={() => setIsOpen(true)}
              className='bg-secondary-500 mt-1  rounded-sm px-2 py-0.5 text-white transition duration-150 active:scale-95'>
              List for sale
            </button>
            <AnimatePresence>
              {isOpen && (
                <ListItemModal
                  chain={chain}
                  data={data}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(!isOpen)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
export default NFTCard
