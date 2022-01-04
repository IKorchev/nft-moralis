import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "./ABIS"
import {
  useChain,
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis"
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
  const createMarketSale = Moralis.Object.extend("createMarketSale")
  const query = new Moralis.Query(createMarketSale)

  const updateItem = async (itemId) => {
    query.equalTo("itemId", itemId).equalTo("confirmed", true)
    const result = await query.first()
    console.log(result)
    result.set("sold", true)
    result.save()
  }

  const buyItem = async (nftContract, itemId, price) => {
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
      onError: (error) => {
        console.log("Something went wrong: " + error.message)
      },
      onComplete: () => {
        updateItem(itemId)
        alert("Transaction completed")
      },
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
        console.log("Unable to get listing price")
      },
    })
  }

  return { buyItem, listItem, updateItem }
}

export default useMarketInteractions
