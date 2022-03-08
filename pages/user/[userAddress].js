//UTILS
import useSWR from "swr"
import { AnimatePresence, motion } from "framer-motion"
import { sortBy, filter, uniqBy } from "lodash"
import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { getNFTsForUser, revalidateOptions } from "../../utils/fetcher"
import { useLayoutEffect, useState } from "react"
//ICONS
import { FilterIcon } from "@heroicons/react/solid"
import { MdCollectionsBookmark } from "react-icons/md"
import { FiActivity } from "react-icons/fi"
import Jazzicon from "../../components/Other/Jazzicon"
//COMPONENTS
import { Tab } from "@headlessui/react"
import PaginatedItems from "../../components/Other/PaginatedItems"
import TransactionsTable from "../../components/tokenId/TransactionsTable"
import Loading from "../../components/Other/Loading"
import { NFTCard } from "../../components/Cards/NFTCard"
import SortFilterAndClear from "../../components/Other/SortAndFilter/SortFilterAndClear"
import Drawer from "../../components/Other/Drawer"
import Metadata from "../../components/Other/Metadata"

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
  const [transactions] = useState([])
  const [open, setOpen] = useState(false)
  const options = {
    url: "noNeedForUrl",
    args: { chain: chain?.chainId, address: router.query.userAddress },
  }

  //prettier-ignore
  const { data, error, isValidating } = useSWR(options, getNFTsForUser,revalidateOptions)

  useLayoutEffect(() => {
    if (data) {
      const collections = uniqBy(data.result, (token) => token.token_address)
      //prettier-ignore
      setFilterOptions(collections.map((el) => ({ data: el.token_address, name: el.name })))
    }
  }, [data])

  if (isValidating) return <Loading />

  if (error) return null

  return (
    <>
      <Metadata title={`NFT Explorer - Address ${router.query.userAddress}`} />
      <div className='container mx-auto min-h-[50rem] overflow-hidden py-24'>
        <AnimatePresence>
          {open && (
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
          )}
        </AnimatePresence>
        <div className='mt-12 flex flex-col items-center'>
          <div className='overflow-hidden rounded-full border-4 border-white'>
            <Jazzicon address={router.query.userAddress} size={150} />
          </div>
          <h2 className='-mt-4 cursor-pointer rounded-full bg-white p-2 text-center text-xl text-black'>
            <span className='relative flex items-center justify-center'>
              {shortenIfAddress(router.query.userAddress)}
            </span>
          </h2>
        </div>
        <Tab.Group
          defaultChecked={1}
          as='div'
          className='container mt-5 flex flex-col items-center'>
          <Tab.List className='mt-5 flex justify-evenly  rounded-lg bg-primary-900  text-white  '>
            <Tab
              className={({ selected }) =>
                `${
                  selected ? "bg-primary-100 text-black" : ""
                } flex items-center rounded-lg px-12 py-3 `
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
              <div className='relative flex items-baseline justify-between border-b border-gray-200 pt-24 pb-2'>
                <h1 className='text-4xl font-extrabold  text-white'>NFTs</h1>
                <button
                  className='inline-flex rounded-full p-2 lg:hidden '
                  onClick={() => setOpen(!open)}>
                  <FilterIcon className='h-6 w-6 text-secondary' />
                </button>
              </div>
              <section aria-labelledby='nfts-heading' className='pt-6 pb-24'>
                <h2 id='nfts-heading' className='sr-only'>
                  NFTs
                </h2>
                <div className='flex flex-col justify-center gap-5 lg:flex-row lg:justify-start'>
                  <div className='hidden flex-col gap-1 lg:flex'>
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
                      isLayoutAnimated={true}
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
              className='styled-scrollbar container mx-auto my-12 h-[40rem] max-w-[70rem] overflow-y-auto'>
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
    </>
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
