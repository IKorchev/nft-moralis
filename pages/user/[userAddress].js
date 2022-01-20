import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useNFTTransfers } from "react-moralis"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { Menu, Tab, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { sortBy } from "lodash"
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai"
import { FiActivity } from "react-icons/fi"
import { MdCollectionsBookmark } from "react-icons/md"
import Jazzicon from "../../components/Jazzicon"
import PaginatedItems from "../../components/PaginatedItems"
import TransactionsTable from "../../components/tokenId/TransactionsTable"
import useSWR from "swr"
import Loading from "../../components/Loading"
import NFTItem from "../../components/NFTItem"

const sortOptions = [
  { name: "ID Ascending", data: "id-desc", checked: true },
  { name: "ID Descending", data: "id-asc", checked: false },
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
  const { chain, Moralis } = useMoralisData()
  const router = useRouter()
  const [sortOption, setSortOption] = useState()
  const fetcher = ({ args }) => {
    const { chain, address } = args
    return Moralis.Web3API.account
      .getNFTs({
        address: address,
        chain: chain,
      })
      .then((data) => {
        if (!data) {
          const error = new Error("An error occurred while fetching the data.")
          throw error
        }
        return data
      })
  }
  //prettier-ignore
  const { data, error, isValidating } = useSWR({url: "noNeedForUrl",args: {chain: chain?.chainId,address: router.query.userAddress,},},fetcher,{revalidateOnFocus: false,revalidateOnReconnect: false,revalidateIfStale: false,})
  const { data: transactions, getNFTTransfers } = useNFTTransfers()
  console.log(data)
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
      <Tab.Group as='div' className='container flex flex-col items-center'>
        <Tab.List className='text-white bg-purple-900 flex  justify-evenly rounded-lg  mt-5  '>
          <Tab
            className={({ selected }) =>
              `${
                selected ? "bg-purple-100 text-black" : ""
              } flex items-center px-12 py-3 rounded-lg `
            }>
            <MdCollectionsBookmark className='mr-3 text-xl' /> Collected
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? "bg-purple-100 text-black" : ""
              } flex items-center px-12 py-3 rounded-lg `
            }>
            <FiActivity className='mr-3 text-xl' /> Activity
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className='container px-6 lg:px-24'>
              <div className='relative z-10 flex items-baseline justify-between pt-24 pb-2 border-b border-gray-200'>
                <h1 className='text-4xl font-extrabold  text-white'>NFTs</h1>
                <div className='flex items-center'>
                  <Menu as='div' className='relative inline-block text-left'>
                    <Menu.Button className='group inline-flex justify-center  font-medium bg-purple-500 px-3 py-2 rounded-lg text-white hover:text-white'>
                      Sort
                      <ChevronDownIcon
                        className='flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-white group-hover:text-white'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-2xl bg-purple-900 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    sortOptions.forEach((el) => (el.checked = false))
                                    option.checked = true
                                    setSortOption(option.data)
                                  }}
                                  className={`
                            ${option.current ? "font-medium text-white" : "text-white"}
                            ${active ? "bg-purple-500" : ""}
                             px-4 py-2 text-sm w-full flex  items-start  `}>
                                  {option.checked ? (
                                    <AiFillCheckCircle className='mr-3 text-lg' />
                                  ) : (
                                    <AiOutlineCheckCircle className='mr-3 text-lg' />
                                  )}
                                  {option.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className='py-12'>
                <PaginatedItems
                  items={sortBy(data?.result, (object) =>
                    sortFunction(object, sortOption)
                  )}
                  itemsPerPage={15}
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
          </Tab.Panel>
          <Tab.Panel className='h-[40rem] overflow-auto my-12 styled-scrollbar'>
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
