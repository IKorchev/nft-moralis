//UTILS
import useSWR from "swr"
import { motion } from "framer-motion"
import { sortBy, filter, uniqBy } from "lodash"
import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useNFTTransfers } from "react-moralis"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { getNFTsForUser, revalidateOptions } from "../../utils/fetcher"
import { useLayoutEffect, useState } from "react"
//ICONS
import { FilterIcon } from "@heroicons/react/solid"
import { MdCollectionsBookmark } from "react-icons/md"
import { FiActivity } from "react-icons/fi"
import Jazzicon from "../../components/Jazzicon"
//COMPONENTS
import { Tab } from "@headlessui/react"
import PaginatedItems from "../../components/PaginatedItems"
import TransactionsTable from "../../components/tokenId/TransactionsTable"
import Loading from "../../components/Loading"
import NFTCard from "../../components/NFTCard"
import SortFilterAndClear from "../../components/SortAndFilter/SortFilterAndClear"
import Drawer from "../../components/Drawer"

const sortOptions = [
  { name: "ID Ascending", data: "id-asc" },
  { name: "ID Descending", data: "id-desc" },
]

const sortFunction = (object, attribute) => {
  switch (attribute) {
    case "id-asc":
      return object.token_id
    case "id-desc":
      return -object.token_id
  }
}

function UserAddress() {
  const router = useRouter()
  const { chain } = useMoralisData()
  const [sortOption, setSortOption] = useState()
  const [filterOptions, setFilterOptions] = useState([])
  const [filterOption, setFilterOption] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(false)
  const options = {
    url: "noNeedForUrl",
    args: { chain: chain?.chainId, address: router.query.userAddress },
  }
  //prettier-ignore
  const { data, error, isValidating } = useSWR(options, getNFTsForUser,revalidateOptions)
  console.log(data)
  useLayoutEffect(() => {
    if (data) {
      const collections = uniqBy(data.result, (token) => token.token_address)
      //prettier-ignore
      setFilterOptions(collections.map((el) => ({ data: el.token_address, name: el.name })))
    }
  }, [data])

  if (isValidating) {
    return (
      <Loading
        containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 200, color: "white" }}
      />
    )
  }
  if (error) return null

  return (
    <div className='container mx-auto overflow-hidden min-h-[50rem]'>
      <Drawer
        open={open}
        setOpen={setOpen}
        ChildElements={
          <SortFilterAndClear
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        }
      />
      <div className='flex flex-col items-center mt-12'>
        <div className='border-4 rounded-full overflow-hidden border-white'>
          <Jazzicon address={router.query.userAddress} size={150} />
        </div>
        <h2 className='text-xl cursor-pointer text-center -mt-4 bg-white rounded-full p-2 text-black'>
          <span className='relative flex items-center justify-center'>
            {shortenIfAddress(router.query.userAddress)}
          </span>
        </h2>
      </div>
      <Tab.Group
        defaultChecked={1}
        as='div'
        className='container flex flex-col items-center mt-5'>
        <Tab.List className='text-white bg-primary-900 flex  justify-evenly rounded-lg  mt-5  '>
          <Tab
            className={({ selected }) =>
              `${
                selected ? "bg-primary-100 text-black" : ""
              } flex items-center px-12 py-3 rounded-lg `
            }>
            <MdCollectionsBookmark className='mr-3 text-xl' /> Collected
          </Tab>
          <Tab
            //prettier-ignore
            className={({ selected }) =>`${selected ? "bg-primary-100 text-black" : ""} flex items-center px-12 py-3 rounded-lg `}>
            <FiActivity className='mr-3 text-xl' /> Activity
          </Tab>
        </Tab.List>
        <Tab.Panels className='w-full'>
          <Tab.Panel
            as={motion.div}
            className='px-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}>
            <div className='relative flex items-baseline justify-between pt-24 pb-2 border-b border-gray-200'>
              <h1 className='text-4xl font-extrabold  text-white'>NFTs</h1>
              <button
                className='lg:hidden inline-flex p-2 rounded-full '
                onClick={() => setOpen(!open)}>
                <FilterIcon className='h-6 w-6 text-secondary' />
              </button>
            </div>
            <section aria-labelledby='nfts-heading' className='pt-6 pb-24'>
              <h2 id='nfts-heading' className='sr-only'>
                NFTs
              </h2>
              <div className='flex flex-col lg:flex-row justify-center lg:justify-start gap-5'>
                <div className='hidden lg:flex flex-col gap-1'>
                  <SortFilterAndClear
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    sortOptions={sortOptions}
                    filterOptions={filterOptions}
                    filterOption={filterOption}
                    setFilterOption={setFilterOption}
                  />
                </div>
                <div className=''>
                  <PaginatedItems
                    items={filter(
                      sortBy(data?.result, (object) => sortFunction(object, sortOption)),
                      (el) =>
                        filterOption
                          ? el.token_address.toLowerCase() === filterOption.toLowerCase()
                          : el
                    )}
                    itemsPerPage={12}
                    renderItem={renderItem}
                  />
                </div>
              </div>
            </section>
          </Tab.Panel>
          <Tab.Panel
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[40rem] container max-w-[70rem] mx-auto my-12 overflow-y-auto styled-scrollbar'>
            <TransactionsTable
              rowProps={{
                className: "bg-primary-50 text-lg ",
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

const renderItem = (el, i) => (
  <NFTCard
    index={i}
    key={el.token_uri}
    tokenUri={el.token_uri}
    metadata={el.metadata}
    tokenId={el.token_id}
    tokenAddress={el.token_address}
    contractName={el.name}
  />
)

export default UserAddress
