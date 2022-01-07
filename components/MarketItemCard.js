import React, { Suspense, useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import useSWR from "swr"
import { NFT_ABI } from "../utils/ABIS"
import { formatImage } from "../utils/common"
import fetcher from "../utils/fetcher"
import useMarketInteractions from "../utils/marketInteractions"
import NFTItem from "./NFTItem"
const MarketItemCard = ({ tokenId, tokenAddress, price, itemId }) => {
  const { chainId } = useChain()
  const { Moralis } = useMoralis()
  const [tokenURI, setTokenURI] = useState()
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
  const { data, error } = useSWR(tokenURI ? tokenURI : null, fetcher)
  return (
    <NFTItem
      tokenUri={tokenURI}
      tokenId={tokenId}
      tokenAddress={tokenAddress}
      contractName={""}
    />
  )
}

export default MarketItemCard
