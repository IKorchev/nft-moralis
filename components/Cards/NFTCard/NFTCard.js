import { AnimatePresence, motion } from "framer-motion"
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

const NFTCard = ({ children, tokenUri, tokenId, tokenAddress, index, ...props }) => {
  const { chain, account } = useChain()
  const [isOpen, setIsOpen] = useState(false)
  const chainString = formatChain(chain?.networkId)
  //prettier-ignore
  const { data, error } = useSWR({url: chain ? "/api/nft" : null,
  args: { contract: tokenAddress,tokenId: tokenId, chain: { chainString: chainString, chainId: chain?.chainId }}},tokenIdFetcher,revalidateOptions)

  if (data) {
    let image =
      formatIpfs(data?.metadata?.image) ||
      formatIpfs(data?.metadata?.image_url) ||
      formatIpfs(data?.metadata?.url)
  }
  return (
    <motion.div layout className='h-72 w-48 overflow-hidden rounded-lg bg-rose-50 text-black '>
      <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
        {!data && !error ? (
          <div className='grid h-48 w-48 place-items-center  bg-white/90 object-scale-down'>
            <FadeLoader size={1} color='black' />
          </div>
        ) : (
          <VideoOrImage format={data.metadata.format} url={image} />
        )}
      </Link>
      <div className='flex flex-col items-start px-2 py-1'>
        <Link passHref href={`/assets/${tokenAddress}/`}>
          <a href=''>
            <small className=' text-[0.7rem] text-blue-900 hover:text-blue-500'>
              {shortenIfAddress(tokenAddress)}
            </small>
          </a>
        </Link>
        <p className='font-bold'>{data?.metadata?.name}</p>
        {data?.owner.toLowerCase() === account?.toLowerCase() && (
          <>
            <button
              onClick={() => setIsOpen(true)}
              className='mt-1 rounded-sm bg-teal-800 px-2 py-1 text-white'>
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
    </motion.div>
  )
}
export default NFTCard
