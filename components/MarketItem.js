import NFTItem from "./NFTItem"
import { useMoralis } from "react-moralis"
import { useMoralisData } from "./Providers/MoralisDataProvider"
import useMarketInteractions from "../hooks/useMarketInteraction"
const MarketItem = ({ price, tokenUri, nftContract, tokenId, itemId, sold, index }) => {
  const { Moralis } = useMoralis()
  const { chain } = useMoralisData()
  const { buyItem } = useMarketInteractions()
  return (
    <NFTItem
      className='relative'
      tokenUri={tokenUri}
      tokenId={tokenId}
      tokenAddress={nftContract}
      index={index}>
      {!sold && (
        <div className='p-3'>
          <p className='absolute top-0 m-4 -right-1/3 cursor-default pointer-events-none text-xs rotate-45 bg-emerald-600 z-50 p-2 px-5 w-60'>
            Available
          </p>
          <button
            className=' bg-emerald-100 py-2 w-full rounded-lg text-black font-bold transition duration-300 hover:bg-purple-300'
            onClick={() => buyItem(nftContract, itemId, price)}>
            Buy now {"  "}
            <span>
              {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
            </span>
          </button>
        </div>
      )}
    </NFTItem>
  )
}

export default MarketItem
