import { useRouter } from "next/router"
import { useRef } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import CollectionHeader from "../../../components/CollectionHeader"
import MarketItem from "../../../components/Marketplace/MarketItem"
import PaginatedItems from "../../../components/PaginatedItems"
const Asset = () => {
  const { query } = useRouter()
  const { chain } = useChain()
  const containerRef = useRef()
  const { Moralis } = useMoralis()

  //prettier-ignore
  const {data: items,error2, isLoading2} = useMoralisQuery('MarketItems', q => q.equalTo('nftContract', query?.contract).equalTo('sold', false))
  const { data: itemsAvailableForPurchase } = useMoralisQuery("MarketItems", (q) =>
    q.equalTo("nftContract", query?.contract).equalTo("sold", false).ascending("price")
  )
  const cheapest = itemsAvailableForPurchase[0]?.attributes?.price
  return (
    <div className='py-24 text-white'>
      <CollectionHeader
        chain={chain}
        address={query.contract}
        amountListed={itemsAvailableForPurchase.length || 0}
        floorPrice={cheapest || 0}
      />
      <div
        ref={containerRef}
        className='container mx-auto flex flex-wrap gap-5 items-center justify-center py-12 px-0 lg:px-12'>
        <PaginatedItems
          items={items}
          itemsPerPage={15}
          renderItem={(el) => {
            return (
              <MarketItem
                key={el.objectId}
                price={el.attributes.price}
                nftContract={el.attributes.nftContract}
                tokenId={el.attributes.tokenId}
                itemId={el.attributes.itemId}
                sold={el.attributes.sold}
                tokenId={el.attributes.tokenId}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default Asset
