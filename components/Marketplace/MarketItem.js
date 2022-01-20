import NFTItem from "../NFTItem"
import { useMoralis } from "react-moralis"
import { useMoralisData } from "../Providers/MoralisDataProvider"
import useMarketInteractions from "../../hooks/useMarketInteraction"

const MarketItem = ({ price, tokenUri, nftContract, tokenId, itemId, sold, index }) => {
  const { Moralis } = useMoralis()
  const { chain } = useMoralisData()
  const { buyItem, updateItem } = useMarketInteractions()

  return (
    <NFTItem
      className='relative'
      tokenUri={tokenUri}
      tokenId={tokenId}
      tokenAddress={nftContract}
      index={index}>
      {!sold ? (
        <div className='p-3'>
          <p className='absolute top-3 right-0 cursor-default rounded-l-md pointer-events-none text-xs  bg-emerald-600 py-1.5 pl-2 pr-0.5'>
            Available
          </p>
          <div className='flex justify-between items-center -mt-3'>
            <button
              className='border-2 border-emerald-400 py-1 w-full px-3 rounded-md text-black font-bold transition duration-300
               bg-gradient-to-r from-emerald-200 to-green-100 hover:to-emerald-300 focus:ring-2 ring-white'
              onClick={() => {
                buyItem(nftContract, itemId, price)
              }}>
              Buy now -
              <span className='text-sm'>
                {" "}
                {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className='p-3'>
          <div className='flex justify-between items-center -mt-3'>
            <span>Sold</span>
            <span className='text-sm'>
              {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
            </span>
          </div>
        </div>
      )}
    </NFTItem>
  )
}

export default MarketItem
