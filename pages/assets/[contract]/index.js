import { AnimatePresence } from "framer-motion"
import Main from "../../../components/AssetsPage/Main"
import { useRouter } from "next/router"
import { Suspense, useState } from "react"
import { useMoralisQuery } from "react-moralis"
import CollectionHeader from "../../../components/AssetsPage/CollectionHeader"
import Drawer from "../../../components/Other/Drawer"
import MarketItem from "../../../components/Cards/MarketItemCard"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import ClearFiltersButton from "../../../components/Other/SortAndFilter/ClearFiltersButton"
import SortSection from "../../../components/Other/SortAndFilter/SortSection"
import PaginatedItems from "../../../components/Other/PaginatedItems"
import { FilterIcon } from "@heroicons/react/solid"
import { sortBy } from "lodash"
import { sortFunction, sortOptions } from "../../../utils/sort"
import SectionTitle from "../../../components/SectionTitle"
import SectionContainer from "../../../components/SectionContainer"
import Loading from "../../../components/Other/Loading"
import useSWR from "swr"
import { metadataFetcher, revalidateOptions } from "../../../utils/fetcher"
import { SyncLoader } from "react-spinners"

const Asset = () => {
  const { query } = useRouter()
  const {
    data: itemsAvailableForPurchase,
    error,
    isLoading,
  } = useMoralisQuery(
    "MarketItems",
    (q) =>
      q
        .equalTo("nftContract", query?.contract)
        .equalTo("sold", false)
        .equalTo("confirmed", true)
        .ascending("price"),
    [query?.contract],
    { live: true }
  )
  let cheapest = 0
  if (error) return null
  if (isLoading) {
    return (
      <div className='grid h-24 place-items-center'>
        <SyncLoader size={25} color='white' />
      </div>
    )
  }
  return (
    <div className='container mx-auto px-4 py-32 text-white lg:px-0'>
      <Suspense
        fallback={
          <div className='grid h-24 place-items-center'>
            <SyncLoader size={5} color='white' />
          </div>
        }>
        <CollectionHeader
          address={query?.contract}
          itemsAvailableForPurchase={itemsAvailableForPurchase}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className='grid h-24 place-items-center'>
            <SyncLoader size={25} color='white' />
          </div>
        }>
        <Main
          itemsAvailableForPurchase={itemsAvailableForPurchase}
          query={query}
          address={query.contract}
        />
      </Suspense>
    </div>
  )
}
const renderItem = (el, i) => (
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
)

export default Asset
