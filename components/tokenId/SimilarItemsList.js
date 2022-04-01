import { useRecoilValue } from "recoil"
import { listingsByContract } from "../../store/listingsSlice"
import MarketItemCard from "../Cards/MarketItemCard"

const SimilarItemsList = ({ address, selectedId }) => {
  const listings = useRecoilValue(listingsByContract(address))
  return (
    <div className=' flex w-full flex-wrap justify-center gap-5 overflow-y-auto py-12'>
      {listings
        .slice(0, 6)
        .filter((el) => el.attributes.tokenId !== selectedId)
        .map((el) => {
          return (
            <MarketItemCard
              key={el.id}
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
