import { shortenIfAddress } from "@usedapp/core"
import { useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import { NFT_ABI } from "../utils/ABIS"
import useMarketInteractions from "../hooks/useMarketInteraction"
import NFTItem from "./NFTItem"
import Link from "next/link"

const MarketItemCard = ({ tokenId, tokenAddress, price, itemId, sold }) => {
  const { Moralis } = useMoralis()
  const { chain } = useChain()
  const [tokenURI, setTokenURI] = useState()
  const { buyItem } = useMarketInteractions()
  const getTokenURI = async () => {
    const tokenURI = await Moralis.Web3.executeFunction({
      abi: NFT_ABI,
      functionName: "tokenURI",
      contractAddress: tokenAddress,
      params: {
        tokenId: tokenId,
      },
    })
    setTokenURI(tokenURI)
  }
  getTokenURI()

  return (
    <NFTItem
      tokenUri={tokenURI}
      tokenId={tokenId}
      tokenAddress={tokenAddress}
      price={parseInt(price)}>
      <NFTItem.Content>
        <div className='justify-start text-left px-2 py-2'>
          <div className='flex justify-between text-white text-left px-2 py-1'>
            <Link passHref href={`/assets/${tokenAddress}`}>
              <span className='text-sm cursor-pointer'>
                {shortenIfAddress(tokenAddress)}
              </span>
            </Link>
            {price && (
              <p className='text-bold'>
                {price} {chain.nativeCurrency.symbol}
              </p>
            )}
          </div>
          <button
            disabled={sold}
            onClick={() => buyItem(itemId)}
            className={`bg-white text-black p-2 rounded-lg hover:bg-rose-200 mt-3 ${
              sold ? "bg-gray-200" : ""
            }`}>
            Buy now
          </button>
        </div>
      </NFTItem.Content>
    </NFTItem>
  )
}

export default MarketItemCard
