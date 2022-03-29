import Main from "../../../components/AssetsPage/Main"
import { useRouter } from "next/router"
import CollectionHeader from "../../../components/AssetsPage/CollectionHeader"
import { useRecoilValue } from "recoil"
import { listingsByContract } from "../../../store/listingsSlice"

const Asset = () => {
  const { query } = useRouter()
  const listings = useRecoilValue(listingsByContract(query.contract))
  return (
    <div className='container mx-auto px-4 py-32 text-white lg:px-0'>
      <CollectionHeader address={query?.contract} itemsAvailableForPurchase={listings} />
      <Main itemsAvailableForPurchase={listings} />
    </div>
  )
}

export default Asset
