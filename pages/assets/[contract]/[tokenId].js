import { formatIpfs } from "../../../utils/common"
import { useRouter } from "next/router"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { getFetcher } from "../../../utils/fetcher"
import ActivityChart from "../../../components/Other/ActivityChart"
import Collapse from "../../../components/tokenId/Collapse"
import ListItemModal from "../../../components/tokenId/ListItemModal"
import TransactionsTable from "../../../components/tokenId/TransactionsTable"
import TokenImage from "../../../components/tokenId/TokenImage"
import Link from "next/link"
import Metadata from "../../../components/Other/Metadata"
import useSWR from "swr"
import Loading from "../../../components/Other/Loading"
import SimilarItemsList from "../../../components/tokenId/SimilarItemsList"
import SectionTitle from "../../../components/SectionTitle"
import { useRecoilValue } from "recoil"
import { chainState, currentUserState } from "../../../store/userSlice"
const Token = () => {
  const chain = useRecoilValue(chainState)
  const account = useRecoilValue(currentUserState)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const url = `/api/nft?contract=${router.query.contract}&tokenId=${router.query.tokenId}&chainId=0x3&chainString=eth/ropsten`
  const { data, error, isValidating } = useSWR(router ? url : null, getFetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
  })
  console.log(data)
  const image =
    formatIpfs(data?.metadata?.image) || formatIpfs(data?.metadata?.image_url) || formatIpfs(data?.metadata?.url)

  if (error)
    return (
      <h1 className='grid h-screen place-items-center text-center text-4xl text-white'>
        Couldn't fetch data for this token.
        <br /> or this token does not exist
      </h1>
    )
  if (isValidating) return <Loading />
  return (
    <div>
      <Metadata
        image={image}
        title={`NFT Explorer | ${data?.symbol} - #${router.query?.tokenId}`}
        description={`NFT Explorer | NFT Token - ${data?.symbol} - #${router.query?.tokenId}`}
        keywords={null}
        url={`https://nft-moralis.vercel.app${router.asPath}`} //
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delayChildren: 1, ease: "easeInOut" }}
        className='container mx-auto  py-24 text-white 2xl:px-24'>
        <div className='flex w-full flex-col justify-evenly gap-5 px-5 lg:flex-row lg:p-0'>
          <div className='lg:max-w-[30rem]'>
            <TokenImage format={data?.metadata?.format} url={image} />
          </div>
          <div className='w-full flex-grow rounded-lg'>
            <Collapse buttonText='Token Information' defaultOpen={true}>
              <div className='h-full p-4'>
                <h2 className='text-white'>{data?.name || data?.metadata?.name}</h2>
                <p className='my-3'>
                  Owned by:
                  <Link href={`/user/${data?.owner}`} passHref>
                    <a className='font-semibold text-blue-200 hover:text-blue-400'>{data?.owner}</a>
                  </Link>
                </p>
                <hr />
                {data?.metadata?.description && (
                  <>
                    <h2 className='mt-5 text-white'>Description</h2>
                    <p className='mt-2'>{data?.metadata?.description || "There is no description for this item.  "}</p>
                  </>
                )}
                <p className='mt-5'>
                  <span className='font-bold'> Address:</span> {router.query?.contract}
                </p>
                <p className='mt-2'>
                  <span className='font-bold'> Token ID:</span> {router.query?.tokenId}
                </p>
                <p className='mt-2'>
                  <span className='font-bold'> Token Symbol:</span> {data?.symbol}
                </p>
                {data?.owner.toLowerCase() == account?.toLowerCase() && (
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    className='card-button mt-3 w-48 rounded-md p-2 text-white'>
                    List for sale
                  </button>
                )}
              </div>
              <AnimatePresence>
                {open && <ListItemModal data={data} chain={chain} isOpen={open} onClose={() => setOpen(false)} />}
              </AnimatePresence>
            </Collapse>
            <Collapse buttonText='Attributes'>
              <div className='grid grid-cols-3 gap-3 p-4'>
                {data?.metadata?.attributes ? (
                  data?.metadata?.attributes?.map((el) => (
                    <div className='border-secondary-300  bg-secondary-600 col-span-1 grid place-items-center rounded-lg border-2 p-1 text-center text-white'>
                      <small className='font-bold'>{el.trait_type}</small>
                      <small>{el.value}</small>
                    </div>
                  ))
                ) : (
                  <h1>No attributes found for this NFT.</h1>
                )}
              </div>
            </Collapse>
            <Collapse buttonText='Price chart'>
              <ActivityChart data={data} />
            </Collapse>
            <Collapse buttonText='Activity'>
              <div className='styled-scrollbar max-h-[20rem]  overflow-y-scroll text-black '>
                <TransactionsTable transactions={data?.transactions?.result} />
              </div>
            </Collapse>
          </div>
        </div>
        <hr className='border-secondary-100 my-12' />
        <section className='px-5 lg:px-0'>
          <SectionTitle title='Similar items' size='sm' />
          <div>
            <SimilarItemsList address={router?.query.contract} />
          </div>
        </section>
      </motion.main>
    </div>
  )
}

export default Token
