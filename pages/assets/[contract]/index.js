import Main from "../../../components/AssetsPage/Main"
import { useRouter } from "next/router"
import { Suspense } from "react"
import CollectionHeader from "../../../components/AssetsPage/CollectionHeader"
import { useRecoilValue } from "recoil"
import { listingsByContract, sortedListings } from "../../../store/listingsSlice"
import { SyncLoader } from "react-spinners"
const Asset = () => {
  const { query } = useRouter()
  const listings = useRecoilValue(sortedListings(query.contract))

  return (
    <div className='container mx-auto px-4 py-32 text-white lg:px-0'>
      <Suspense
        fallback={
          <div className='grid h-24 place-items-center'>
            <SyncLoader size={5} color='white' />
          </div>
        }>
        <CollectionHeader address={query?.contract} itemsAvailableForPurchase={listings} />
      </Suspense>
      <Suspense
        fallback={
          <div className='grid h-24 place-items-center'>
            <SyncLoader size={25} color='white' />
          </div>
        }>
        <Main itemsAvailableForPurchase={listings} query={query} address={query.contract} />
      </Suspense>
    </div>
  )
}

export default Asset
