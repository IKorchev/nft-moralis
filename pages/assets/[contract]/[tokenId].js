import { formatChain, formatIpfs } from "../../../utils/common"
import { useRouter } from "next/router"
import Collapse from "../../../components/tokenId/Collapse"
import useSWR from "swr"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import TransactionsTable from "../../../components/tokenId/TransactionsTable"
import TokenImage from "../../../components/tokenId/TokenImage"
import { tokenIdFetcher, revalidateOptions } from "../../../utils/fetcher"
import Link from "next/link"
import ActivityChart from "../../../components/ActivityChart"
import { MoonLoader } from "react-spinners"
import { motion } from "framer-motion"
import { useState } from "react"
import ListItemModal from "../../../components/tokenId/ListItemModal"

const Token = () => {
  const { chain, account } = useMoralisData()
  const { query } = useRouter()
  const [open, setOpen] = useState(false)

  const options = {
    url: chain ? "/api/nft" : null,
    args: {
      contract: query.contract,
      tokenId: query.tokenId,
      chain: { chainString: formatChain(chain?.networkId), chainId: chain?.chainId },
    },
  }
  const { data, error, isValidating } = useSWR(options, tokenIdFetcher, revalidateOptions)
  if (error)
    return (
      <div className='h-[35rem] grid place-items-center'>
        <h1 className='text-white text-3xl'>{error.message}</h1>
      </div>
    )
  if (isValidating)
    return (
      <div className='min-h-[40rem] grid place-items-center'>
        <MoonLoader color='white' width={150} height={150} />
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delayChildren: 1, ease: "easeInOut" }}
      className='container xl:px-24 py-12 mx-auto text-white'>
      <div className='flex flex-col justify-evenly lg:flex-row gap-5 px-5 lg:p-0 w-full'>
        <div className='lg:min-w-[30rem]'>
          <TokenImage
            format={data?.metadata?.format}
            url={formatIpfs(data?.metadata?.image || data?.metadata?.image_url)}
          />
        </div>
        <div className='bg-primary-900 flex-grow rounded-lg w-full'>
          <Collapse buttonText='Token Information' defaultOpen={true}>
            <div className='bg-white text-black h-full p-4'>
              <h2 className=''>{data?.name || data?.metadata?.name}</h2>
              <p>
                Owned by:{" "}
                <Link href={`${data?.owner}`} passHref>
                  <a className='text-blue-900 font-semibold'>{data?.owner}</a>
                </Link>
              </p>
              <hr />
              {data?.description && (
                <>
                  <h2 className='mt-5'>Description</h2>
                  <p className='mt-2'>
                    {data?.description || "There is no description for this item.  "}
                  </p>
                  <hr />
                </>
              )}
              <p className='mt-5'>
                <span className='font-bold'> Address:</span> {query.contract}
              </p>

              {data?.owner.toLowerCase() == account.toLowerCase() && (
                <button
                  onClick={() => {
                    setOpen(true)
                  }}
                  className='bg-secondary text-white p-2 m-2'>
                  List item
                </button>
              )}

              <p className='mt-2'>
                <span className='font-bold'> Token ID:</span> {query.tokenId}
              </p>
              <p className='mt-2'>
                <span className='font-bold'> Token Symbol:</span> {data?.symbol}
              </p>
            </div>
          </Collapse>
          <Collapse buttonText='Attributes'>
            <div className='grid grid-cols-3 gap-3 bg-white p-4'>
              {data?.metadata?.attributes?.map((el) => (
                <div className='col-span-1 border text-black grid place-items-center bg-primary-200 border-primary-300 text-center p-1 rounded-lg'>
                  <small className='font-bold'>{el.trait_type}</small>
                  <small>{el.value}</small>
                </div>
              ))}
            </div>
          </Collapse>
          <Collapse buttonText='Price chart'>
            <ActivityChart data={data} />
          </Collapse>
          <Collapse buttonText='Activity'>
            <div className='text-black max-h-[20rem]  overflow-y-scroll styled-scrollbar '>
              <TransactionsTable transactions={data?.transactions} />
            </div>
          </Collapse>
        </div>
      </div>
      <ListItemModal
        data={data}
        chain={chain}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </motion.div>
  )
}

export default Token
