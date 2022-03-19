import { useRecoilValue } from "recoil"
import { listingsByContract } from "../../store/listingsSlice"
import MarketItemCard from "../Cards/MarketItemCard"

const SimilarItemsList = ({ address }) => {
  const listings = useRecoilValue(listingsByContract(address))
  return (
    <div className='styled-scrollbar flex  w-full gap-5 overflow-y-auto py-5'>
      {listings.slice(0, 7).map((el) => {
        return (
          <MarketItemCard
            itemId={el.attributes.itemId}
            tokenId={el.attributes.tokenId}
            nftContract={el.attributes.nftContract}
            price={el.attributes.price}
            sold={el.attributes.sold}
          />
        )
      })}
    </div>
  )
}

export default SimilarItemsList
