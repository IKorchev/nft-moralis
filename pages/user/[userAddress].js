//UTILS
import useSWR from "swr"
import { motion } from "framer-motion"
import { sortBy, filter, uniq } from "lodash"
import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useNFTTransfers } from "react-moralis"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { getNFTsForUser } from "../../utils/fetcher"
import { Fragment, useLayoutEffect, useState } from "react"
//ICONS
import { FilterIcon, XIcon } from "@heroicons/react/solid"
import { MdCollectionsBookmark } from "react-icons/md"
import { FiActivity, FiX } from "react-icons/fi"
import Jazzicon from "../../components/Jazzicon"
//COMPONENTS
import { Dialog, Tab, Transition } from "@headlessui/react"
import PaginatedItems from "../../components/PaginatedItems"
import TransactionsTable from "../../components/tokenId/TransactionsTable"
import Loading from "../../components/Loading"
import NFTItem from "../../components/NFTItem"
import FilterSection from "../../components/FilterSection"
import SortSection from "../../components/SortSection"

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filterOptions, setFilterOptions] = useState([])
  const [filterOption, setFilterOption] = useState(null)
  //prettier-ignore
  const { data, error, isValidating } = useSWR({url: "noNeedForUrl",args: {chain: chain?.chainId,address: router.query.userAddress,},},getNFTsForUser,{revalidateOnFocus: false,revalidateOnReconnect: false,revalidateIfStale: false,})
  const { data: transactions, getNFTTransfers } = useNFTTransfers()

  useLayoutEffect(() => {
    if (data) {
      setFilterOptions(uniq(data.result.map((el) => el.name)))
    }
  }, [data])
  //prettier-ignore
  if (isValidating) return <Loading containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }} loaderProps={{ size: 200, color: "white" }} />
  if (error) return null

  return (
    <div className='container mx-auto overflow-hidden min-h-[50rem]'>
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
        <Tab.Panels className='w-full px-4'>
          <Tab.Panel
            as={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, x: 0 }}>
            <div>
              <Transition.Root show={mobileFiltersOpen} as='div'>
                <Dialog
                  as='div'
                  className='fixed inset-0 flex z-40 lg:hidden'
                  onClose={setMobileFiltersOpen}>
                  <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-90' />
                  <Transition.Child
                    as={Fragment}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'>
                    <div className='ml-auto relative max-w-xs w-full h-full bg-primary-900  shadow-xl py-4 pb-5 flex flex-col overflow-y-auto'>
                      <div className='px-4 flex items-center justify-between'>
                        <h2 className='text-lg font-medium text-gray-100'>Filters</h2>
                        <button
                          type='button'
                          className='-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400'
                          onClick={() => setMobileFiltersOpen(false)}>
                          <span className='sr-only'>Close menu</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                      <div className='mt-10 py-5 space-y-1'>
                        <SortSection
                          sortOption={sortOption}
                          setSortOption={setSortOption}
                        />
                        <FilterSection
                          variant='mobile'
                          filterOptions={filterOptions}
                          filterOption={filterOption}
                          setFilterOption={setFilterOption}
                        />
                        <button
                          onClick={() => {
                            setFilterOption(null)
                            setSortOption(null)
                          }}
                          className='bg-pink-700 flex justify-between items-center w-full  ring-white focus:ring-2 py-3  text-white'>
                          <FiX className='text-xl text-start ml-4' />
                          <span className='flex-1 ml-14'>Clear all</span>
                          <div className='flex-1' />
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </Dialog>
              </Transition.Root>
              <div className='relative z-10 flex items-baseline justify-between pt-12 pb-2 mb-6 border-b border-gray-200'>
                <h1 className='text-4xl font-extrabold  text-white'>NFTs</h1>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='p-2 -m-2 ml-4 sm:ml-6 text-white hover:text-pinkish lg:hidden'
                    onClick={() => setMobileFiltersOpen(true)}>
                    <span className='sr-only'>Filters</span>
                    <FilterIcon className='w-5 h-5' aria-hidden='true' />
                  </button>
                </div>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-4  gap-x-8 gap-y-10'>
                <div className='hidden lg:block  h-max  space-y-1 '>
                  <SortSection sortOption={sortOption} setSortOption={setSortOption} />
                  <FilterSection
                    filterOptions={filterOptions}
                    filterOption={filterOption}
                    setFilterOption={setFilterOption}
                  />
                  <button
                    onClick={() => {
                      setFilterOption(null)
                      setSortOption(null)
                    }}
                    className='hidden relative bg-pink-700 lg:block  items-center w-full text-center hover:bg-rose-900 ring-white
                     focus:ring-2 py-3 px-4 text-white'>
                    <FiX className='text-xl mr-5 absolute ' /> Clear all
                  </button>
                </div>
                <div className='lg:col-span-3'>
                  <PaginatedItems
                    items={filter(
                      sortBy(data?.result, (object) => sortFunction(object, sortOption)),
                      (el) => (filterOption ? el.name === filterOption : el)
                    )}
                    itemsPerPage={12}
                    renderItem={(el, i) => (
                      <NFTItem
                        index={i}
                        key={el.token_uri}
                        tokenUri={el.token_uri}
                        metadata={el.metadata}
                        tokenId={el.token_id}
                        tokenAddress={el.token_address}
                        contractName={el.name}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
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
export default UserAddress
