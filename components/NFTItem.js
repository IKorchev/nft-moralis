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
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='rounded-lg object-scale-down cursor-pointer h-48 '
          />
        ) : (
          <img
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
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
        <p className='font-bold'>{data?.name}</p>
      </div>
      {children}
    </motion.div>
  )
}
export default NFTItem
