import { motion } from "framer-motion"
import { formatChain, formatIpfs } from "../utils/common"
import Link from "next/link"
import useSWR from "swr"
import { tokenIdFetcher, revalidateOptions } from "../utils/fetcher"
import { FadeLoader } from "react-spinners"
import { shortenIfAddress } from "@usedapp/core"
import { useChain } from "react-moralis"
import ListItemModal from "./tokenId/ListItemModal"
import { useState } from "react"
const NFTCard = ({ children, tokenUri, tokenId, tokenAddress, index, ...props }) => {
  const { chain, account } = useChain()
  const [isOpen, setIsOpen] = useState(false)
  //prettier-ignore
  const { data, error, isValidating } = useSWR({url: chain ? "/api/nft" : null,
  args: { contract: tokenAddress,
          tokenId: tokenId,
          chain: { chainString: formatChain(chain?.networkId), chainId: chain?.chainId },},},
          tokenIdFetcher,revalidateOptions)

  return (
    <motion.div
      className='flex rounded-lg transition duration-300 
    ease-in-out hover:-translate-y-1 hover:shadow-3xl hover:shadow-primary-100/50
      text-black overflow-hidden w-48 h-72 flex-col relative bg-light'>
      <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
        {isValidating ? (
          <div className='grid place-items-center h-48 object-scale-down bg-white/90'>
            <FadeLoader size={1} color='black' />
          </div>
        ) : data?.format === "video" ? (
          <video
            autoPlay
            muted
            controls
            src={
              formatIpfs(
                data?.metadata?.image_url || data?.metadata.image || data?.metadata?.url
              ) || ""
            }
            alt=''
            className='rounded-lg object-scale-down cursor-pointer h-48 '
          />
        ) : (
          <img
            src={
              formatIpfs(
                data?.metadata?.image_url || data?.metadata?.image || data?.metadata?.url
              ) || ""
            }
            alt=''
            className='object-scale-down cursor-pointer h-48'
          />
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
              className='bg-teal-800 text-white px-2 py-1 rounded-sm mt-1'>
              List for sale
            </button>
            <ListItemModal
              chain={chain}
              data={data}
              isOpen={isOpen}
              onClose={() => setIsOpen(!isOpen)}
            />
          </>
        )}
      </div>
      {children}
    </motion.div>
  )
}
export default NFTCard
