import PaginatedItems from "../../components/PaginatedItems"
import Loading from "../../components/Loading"
import MarketItem from "../../components/Marketplace/MarketItem"
import { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { sortBy } from "lodash"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import { useChain, useMoralisQuery } from "react-moralis"
import { motion } from "framer-motion"

const sortOptions = [
  { name: "Newest first", data: "date-desc", checked: true },
  { name: "Oldest first", data: "date-asc", checked: false },
  { name: "Price: Low to High", data: "price-asc", checked: false },
  { name: "Price: High to Low", data: "price-desc", checked: false },
]

const sortFunction = (object, attribute) => {
  switch (attribute) {
    case "price-asc":
      return object.attributes.price
    case "price-desc":
      return -object.attributes.price
    case "date-asc":
      return object.createdAt
    case "date-desc":
      return -object.createdAt
  }
}

const Home = () => {
  const { chain } = useMoralisData()
  const [sortOption, setSortOption] = useState("date-asc")
  //prettier-ignore
  const {data: allListings,error,isFetching,isLoading} = useMoralisQuery("MarketItems",(q) => q.equalTo("confirmed", true).equalTo("sold", true),[],{live: true,})
  if (chain?.chainId !== "0x3") return <ChangeNetwork />
  if (error) return null
  if (isFetching || isLoading) {
    return (
      <Loading
        containerProps={{ className: "h-[50vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 100, color: "white" }}
      />
    )
  }
  return (
    <main className='container mx-auto px-6 lg:px-24'>
      <div className='relative z-10 flex items-baseline justify-between pt-24 pb-2 border-b border-gray-200'>
        <h1 className='text-4xl font-extrabold  text-white'>Marketplace</h1>
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
      <section aria-labelledby='marketplace-heading' className='pt-6 pb-24'>
        <h2 id='marketplace-heading' className='sr-only'>
          NFTs
        </h2>
        <div className='grid grid-cols-1 gap-x-4 gap-y-10'>
          <PaginatedItems
            items={sortBy(allListings, (object) => sortFunction(object, sortOption))}
            itemsPerPage={15}
            renderItem={(el, i) => (
              <MarketItem
                createdAt={el.createdAt}
                price={el.attributes.price}
                tokenUri={el.tokenUri}
                tokenId={el.attributes.tokenId}
                nftContract={el.attributes.nftContract}
                index={i}
                itemId={el.attributes.itemId}
                sold={el.attributes.sold}
                key={el.attributes.itemId}
              />
            )}
          />
        </div>
      </section>
    </main>
  )
}

const ChangeNetwork = () => {
  const { switchNetwork } = useChain()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='grid place-items-center h-[70vh]'>
      <button
        className='bg-pinkish p-3 text-lg rounded-lg'
        onClick={() => switchNetwork("0x3")}>
        Switch to ropsten
      </button>
    </motion.div>
  )
}

export default Home
