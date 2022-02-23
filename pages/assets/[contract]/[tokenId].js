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
import { AnimatePresence, motion } from "framer-motion"
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
      <div className='grid h-[35rem] place-items-center'>
        <h1 className='text-3xl text-white'>{error.message}</h1>
      </div>
    )
  if (isValidating)
    return (
      <div className='grid min-h-[40rem] place-items-center'>
        <MoonLoader color='white' width={150} height={150} />
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delayChildren: 1, ease: "easeInOut" }}
      className='container mx-auto py-12 text-white xl:px-24'>
      <div className='flex w-full flex-col justify-evenly gap-5 px-5 lg:flex-row lg:p-0'>
        <div className='lg:min-w-[30rem]'>
          <TokenImage
            format={data?.metadata?.format}
            url={formatIpfs(data?.metadata?.image || data?.metadata?.image_url)}
          />
        </div>
        <div className='w-full flex-grow rounded-lg bg-primary-900'>
          <Collapse buttonText='Token Information' defaultOpen={true}>
            <div className='h-full bg-white p-4 text-black'>
              <h2 className=''>{data?.name || data?.metadata?.name}</h2>
              <p>
                Owned by:{" "}
                <Link href={`${data?.owner}`} passHref>
                  <a className='font-semibold text-blue-900'>{data?.owner}</a>
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
                  className='m-2 bg-secondary p-2 text-white'>
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
                <div className='col-span-1 grid place-items-center rounded-lg border border-primary-300 bg-primary-200 p-1 text-center text-black'>
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
            <div className='styled-scrollbar max-h-[20rem]  overflow-y-scroll text-black '>
              <TransactionsTable transactions={data?.transactions} />
            </div>
          </Collapse>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <ListItemModal data={data} chain={chain} isOpen={open} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Token
