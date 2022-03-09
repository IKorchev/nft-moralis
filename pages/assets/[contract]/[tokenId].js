import { formatChain, formatIpfs } from "../../../utils/common"
import { tokenIdFetcher, revalidateOptions } from "../../../utils/fetcher"
import { useRouter } from "next/router"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import ActivityChart from "../../../components/Other/ActivityChart"
import Collapse from "../../../components/tokenId/Collapse"
import ListItemModal from "../../../components/tokenId/ListItemModal"
import TransactionsTable from "../../../components/tokenId/TransactionsTable"
import TokenImage from "../../../components/tokenId/TokenImage"
import { AnimatePresence, motion } from "framer-motion"
import { MoonLoader } from "react-spinners"
import { useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import Metadata from "../../../components/Other/Metadata"
const Token = () => {
  const { chain, account } = useMoralisData()
  const router = useRouter()
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

  if (error) {
    return (
      <div className='grid h-[35rem] place-items-center'>
        <h1 className='text-3xl text-white'>{error.message}</h1>
      </div>
    )
  }
  if (isValidating) {
    return (
      <div className='grid min-h-[40rem] place-items-center'>
        <MoonLoader color='white' width={150} height={150} />
      </div>
    )
  }

  const image = formatIpfs(data?.metadata?.image) || formatIpfs(data?.metadata?.image_url)

  return (
    <div>
      <Metadata
        image={image}
        title={`NFT Explorer | ${data?.symbol} - #${query.tokenId}`}
        description={`NFT Explorer | NFT Token - ${data?.symbol} - #${query.tokenId}`}
        keywords={null}
        url={`https://nft-moralis.vercel.app${router.asPath}`} //
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delayChildren: 1, ease: "easeInOut" }}
        className='container mx-auto  py-24 text-white xl:px-24'>
        <div className='flex w-full flex-col justify-evenly gap-5 px-5 lg:flex-row lg:p-0'>
          <div className='lg:min-w-[30rem]'>
            <TokenImage format={data?.metadata?.format} url={image} />
          </div>
          <div className='w-full flex-grow rounded-lg bg-primary-900'>
            <Collapse buttonText='Token Information' defaultOpen={true}>
              <div className='h-full bg-white p-4 text-black'>
                <h2 className=''>{data?.name || data?.metadata?.name}</h2>
                <p>
                  Owned by:{" "}
                  <Link href={`/user/${data?.owner}`} passHref>
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
      </motion.main>
    </div>
  )
}

export default Token
