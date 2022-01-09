import { useChain } from "react-moralis"
import useMarketInteractions from "../hooks/useMarketInteraction"
import NFTItem from "./NFTItem"

const NFT = ({ el, i }) => {
  const { listItem } = useMarketInteractions()
  const { account } = useChain()
  return (
    <NFTItem
      index={i}
      key={el.token_uri}
      tokenUri={el.token_uri}
      metadata={el.metadata}
      tokenId={el.token_id}
      tokenAddress={el.token_address}
      contractName={el.name}>
      <NFTItem.Content>
        <div className='p-2 font-bold'>
          <p className='my-1'>{el.name}</p>
          <p>#{el.token_id}</p>
          {el.owner_of === account && (
            <button
              onClick={() => {
                listItem(el.token_address, el.token_id, 1)
              }}
              className='bg-pink-600 p-1 mt-2 text-sm rounded-sm'>
              Place for sale
            </button>
          )}
        </div>
      </NFTItem.Content>
    </NFTItem>
  )
}

export default NFT
