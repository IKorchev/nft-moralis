import NFTItem from "../NFTItem"
import { useMoralis } from "react-moralis"
import { useMoralisData } from "../Providers/MoralisDataProvider"
import useMarketInteractions from "../../hooks/useMarketInteraction"

const MarketItem = ({
  price,
  tokenUri,
  nftContract,
  tokenId,
  itemId,
  sold,
  index,
  createdAt,
}) => {
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
      <div className='p-2'>
        {sold ? (
          <>
            <div className='flex justify-between items-center -mt-1'>
              <button
                disabled={sold}
                className='bg-red-200 py-1 w-full flex justify-center items-center rounded-lg text-gray-700 font-bold transition duration-300  focus:ring-2 ring-white'
                onClick={() => buyItem(nftContract, itemId, price)}>
                Sold for
                <span className='text-sm ml-2'>
                  {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='absolute top-3 right-0 cursor-default rounded-l-md pointer-events-none text-xs text-white bg-emerald-600 py-1.5 pl-2 pr-0.5'>
              Available
            </p>
            <div className='flex justify-between items-center -mt-1'>
              <button
                className='bg-emerald-400 w-full flex justify-center items-center  py-1 px-3  rounded-lg text-black font-bold transition duration-300 hover:bg-emerald-500 focus:ring-2 ring-white'
                onClick={() => buyItem(nftContract, itemId, price)}>
                Buy
                <span className='text-sm ml-2'>
                  ( {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol} )
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </NFTItem>
  )
}

export default MarketItem
