import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useState } from "react"
import Tooltip from "../../components/Tooltip"
import { useNFTTransfers } from "react-moralis"
import Jazzicon from "../../components/Jazzicon"
import PaginatedItems from "../../components/PaginatedItems"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { Tab } from "@headlessui/react"
import TransactionsTable from "../../components/tokenId/TransactionsTable"
import useSWR from "swr"

function UserAddress() {
  const { chain, account, getNFTTrades, Moralis } = useMoralisData()
  const router = useRouter()
  const fetcher = (url) => {
    return Moralis.Web3API.account
      .getNFTs({
        address: router?.query.userAddress,
        chain: chain?.chainId,
      })
      .then((data) => {
        if (!data) {
          const error = new Error("An error occurred while fetching the data.")
          throw error
        }
        return data
      })
  }

  const { data, error, isValidating } = useSWR(
    chain && router.query.userAddress && "noNeedForUrl",
    fetcher
  )
  console.log(data, error, isValidating)
  const { data: transactions, getNFTTransfers } = useNFTTransfers()

  // If user wanted to see their own nfts and changes account while on the page,
  // they need to be redirected to the proper url so the above function gets triggered
  // and fetches data for the correct account

  const [tooltipShown, setTooltipShown] = useState(false)
  const toggleTooltip = () => {
    setTooltipShown(!tooltipShown)
  }
  if (isValidating) return null
  if (error) return null
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center mt-12'>
        <div className='border-4 rounded-full overflow-hidden border-white'>
          <Jazzicon address={router.query.userAddress} size={150} />
        </div>
        <h2
          onMouseEnter={toggleTooltip}
          onMouseLeave={toggleTooltip}
          className='text-xl cursor-pointer text-center -mt-4 bg-white rounded-full p-2 text-black'>
          <span className='relative flex items-center justify-center'>
            {shortenIfAddress(router.query.userAddress)}
            <Tooltip
              text={router.query.userAddress}
              shown={tooltipShown}
              className='mt-1'
            />
          </span>
        </h2>
      </div>
      <Tab.Group as='div' className='container flex flex-col items-center'>
        <Tab.List className='text-white bg-purple-900  justify-evenly rounded-lg  mt-5 '>
          <Tab
            className={({ selected }) =>
              `${selected ? "bg-purple-100 text-black" : ""} p-3 rounded-lg `
            }>
            Collected
          </Tab>
          <Tab
            className={({ selected }) =>
              `${selected ? "bg-purple-100 text-black" : ""} p-3 rounded-lg `
            }>
            Activity
          </Tab>
          <Tab
            className={({ selected }) =>
              `${selected ? "bg-purple-100 text-black" : ""} p-3 rounded-lg `
            }>
            Collected
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PaginatedItems items={data?.result} itemsPerPage={15} />
          </Tab.Panel>
          <Tab.Panel>
            <TransactionsTable
              rowProps={{
                className: "bg-purple-50 text-lg",
              }}
              transactions={transactions}
            />
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default UserAddress
