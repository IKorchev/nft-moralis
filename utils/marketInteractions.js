import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "./getMarketItems"
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { useState } from "react"

const useMarketInteractions = () => {
  const contractFunctions = {
    BUY_ITEM: "createMarketSale",
    LIST_ITEM: "createMarketItem",
    GET_LISTING_PRICE: "getListingPrice",
    IS_APPROVED_FOR_ALL: "isApprovedForAll",
    SET_APPROVAL_FOR_ALL: "setApprovalForAll",
    APPROVE: "approve",
  }
  const { Moralis } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const { account } = useChain()
  const [listingPrice, setListingPrice] = useState()
  const buyItem = async (price, nftContract, itemId) => {
    contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: contractFunctions.BUY_ITEM,
        msgValue: price,
        params: {
          nftContract,
          itemId,
        },
      },
      onSuccess: (data) => {
        console.log("Success " + data)
      },
      onError: (error) => {
        alert("Something went wrong: " + error.message)
      },
      onComplete: () => alert("Transaction completed"),
    })
  }

  const listItem = async (contractAddress, tokenId, price) => {
    await contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "getListingPrice",
      },
      onSuccess: (listingPrice) => {
        contractProcessor.fetch({
          params: {
            contractAddress: MARKET_ADDRESS,
            abi: MARKET_ABI,
            functionName: "createMarketItem",
            msgValue: listingPrice,
            params: {
              nftContract: contractAddress,
              tokenId: parseInt(tokenId),
              price: Moralis.Units.ETH(price).toString(),
            },
          },
          onSuccess: (data) => {
            console.log(data)
          },
          onError: (data) => {
            console.log(data)
          },
        })
      },
      onError: () => {
        alert("Unable to get listing price")
      },
    })
  }

  return { buyItem, listItem }
}

export default useMarketInteractions
