import { motion } from "framer-motion"
import { formatIpfs } from "../utils/common"
import Link from "next/link"
import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { FadeLoader } from "react-spinners"
import { shortenIfAddress } from "@usedapp/core"

const NFTItem = ({ children, tokenUri, tokenId, tokenAddress, index, ...props }) => {
  //prettier-ignore
  const { data, error, isValidating } = useSWR({url: "notNeeded", args: {
    tokenUri: tokenUri, nftContract: tokenAddress, tokenId:tokenId
  }}, fetcher, {
    revalidateOnFocus:false,
    revalidateIfStale:false,
  })

  return (
    <motion.div className='flex rounded-lg bg-purple-900 overflow-hidden w-72 h-[25rem] flex-col relative'>
      <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
        {isValidating ? (
          <div className='grid place-items-center h-72 object-scale-down bg-white/90'>
            <FadeLoader size={1} color='black' />
          </div>
        ) : data?.format === "video" ? (
          <video
            autoPlay
            muted
            controls
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='rounded-lg object-scale-down cursor-pointer min-h-72 h-72 '
          />
        ) : (
          <img
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='object-scale-down cursor-pointer h-72'
          />
        )}
      </Link>
      <div className='flex flex-col items-start p-3'>
        <p>{data?.name}</p>
        <Link passHref href={`/assets/${tokenAddress}/`}>
          <a href=''>
            <small className=' text-xs'>{shortenIfAddress(tokenAddress)}</small>
          </a>
        </Link>
      </div>
      {children}
    </motion.div>
  )
}
export default NFTItem
