import useSWR from "swr"
import ActivityChart from "./ActivityChart"
import Collapse from "../tokenId/Collapse"
import ListItemModal from "../tokenId/ListItemModal"
import SimilarItemsList from "../tokenId/SimilarItemsList"
import TokenImage from "../tokenId/TokenImage"
import TransactionsTable from "../tokenId/TransactionsTable"
import Loading from "../Other/Loading"
import { AnimatePresence, motion } from "framer-motion"
import { Suspense, useState } from "react"
import { useRecoilValue } from "recoil"
import { useNft } from "use-nft"
import { SectionTitle } from "../Section"
import { currentUserState } from "../../store/userSlice"
import { formatIpfs } from "../../utils/common"
import TokenInformation from "./TokenInformation"
import TokenAttributes from "./TokenAttributes"
import { BarLoader } from "react-spinners"
import { getFetcher, revalidateOptions } from "../../utils/fetcher"

const Main = ({ contract, tokenId }) => {
  const account = useRecoilValue(currentUserState)
  const [open, setOpen] = useState(false)
  const { nft, loading, error } = useNft(contract, tokenId)
  const { data, swrError, isValidating } = useSWR(
    contract && tokenId ? `/api/nft?contract=${contract}&tokenId=${tokenId}` : null,
    getFetcher,
    revalidateOptions
  )

  if (loading || isValidating) return <Loading />
  if (error || swrError) return <h1 className='py-24 text-4xl text-white'>There was an error fetching the data</h1>

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delayChildren: 1, ease: "easeInOut" }}
      className='container mx-auto  py-24 text-white 2xl:px-24'>
      <div className='flex w-full flex-col justify-evenly gap-5 px-5 lg:flex-row lg:p-0'>
        <div className='lg:max-w-[30rem]'>
          <TokenImage format={nft?.imageType} url={formatIpfs(nft?.image || nft?.image_url || nft?.rawData.image)} />
        </div>
        <div className='w-full flex-grow rounded-lg'>
          <Collapse buttonText='Token Information' defaultOpen={true}>
            <TokenInformation
              account={account}
              contract={contract}
              tokenId={tokenId}
              nft={nft}
              openModal={() => setOpen(true)}
            />
          </Collapse>
          <Collapse buttonText='Attributes'>
            {nft.rawData.attributes ? (
              <TokenAttributes attributes={nft?.rawData.attributes} />
            ) : (
              <h1>No attributes found for this NFT.</h1>
            )}
          </Collapse>
          <Collapse buttonText='Price chart'>
            <Suspense fallback={<BarLoader />}>
              <ActivityChart data={data} />
            </Suspense>
          </Collapse>
          <Collapse buttonText='Activity'>
            <div className='styled-scrollbar max-h-[20rem]  overflow-y-scroll text-white '>
              <TransactionsTable transactions={data?.transactions.result} />
            </div>
          </Collapse>
        </div>
      </div>
      <section className='px-5 pt-32 lg:px-0'>
        <SectionTitle title='Similar items' size='lg' justify='center' />
        <div>
          <SimilarItemsList address={contract} selectedId={tokenId} />
        </div>
      </section>
      <AnimatePresence>
        {open && (
          <ListItemModal data={{ ...nft, contractAddress: contract }} isOpen={open} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </motion.main>
  )
}

export default Main
