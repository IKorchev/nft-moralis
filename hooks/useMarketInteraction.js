import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "../utils/ABIS"
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { toast } from "react-toastify"
import { useMemo } from "react"

const useMarketInteractions = () => {
  const contractFunctions = {
    BUY_ITEM: "createMarketSale",
    LIST_ITEM: "createMarketItem",
    GET_LISTING_PRICE: "getListingPrice",
    IS_APPROVED_FOR_ALL: "isApprovedForAll",
    SET_APPROVAL_FOR_ALL: "setApprovalForAll",
    APPROVE: "approve",
    FETCH_MARKET_ITEMS: "fetchMarketItems",
    COST: "cost",
    MINT: "mint",
    CREATE_MARKET_ITEM: "createMarketItem",
  }
  const { Moralis, account } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const { chain } = useChain()
  const MarketItems = Moralis.Object.extend("MarketItems")
  const query = new Moralis.Query(MarketItems)

  //update in moralis database
  const updateItem = async (itemId) => {
    console.log(itemId)
    query.equalTo("itemId", itemId).equalTo("confirmed", true)
    const result = await query.first()
    console.log(result)
    // result.set("sold", true)
    // result.save()
  }

  //get cost required for mint
  const getMintCost = async (contractAddress) => {
    let cost
    await contractProcessor.fetch({
      params: {
        abi: NFT_ABI,
        contractAddress: contractAddress,
        functionName: contractFunctions.COST,
      },
      onError: (err) => console.log(err),
      onSuccess: (data) => (cost = data),
    })
    return cost
  }

  //mints token to user address
  const mintToken = async (contractAddress, mintCost, mintAmount) => {
    await contractProcessor.fetch({
      params: {
        abi: NFT_ABI,
        contractAddress: contractAddress,
        functionName: contractFunctions.MINT,
        msgValue: mintCost * mintAmount,
        params: {
          _to: account,
          _mintAmount: mintAmount,
        },
      },
      onError: (err) => console.log(err),
    })
  }

  // get nfts inside market contract
  const fetchMarketItems = async () => {
    await contractProcessor.fetch({
      params: {
        abi: MARKET_ABI,
        contractAddress: MARKET_ADDRESS,
        functionName: contractFunctions.FETCH_MARKET_ITEMS,
      },
      onSuccess: (data) => console.log(data),
      onError: (err) => console.log(err),
    })
  }

  // buy NFT from Market
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
      onSuccess: (data) => console.log(data),
      onComplete: () => updateItem(itemId),
    })
  }

  // Place item on sale
  const createMarketItem = async (listingPrice, contractAddress, tokenId, price) => {
    await contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: contractFunctions.CREATE_MARKET_ITEM,
        msgValue: listingPrice,
        params: {
          nftContract: contractAddress,
          tokenId: parseInt(tokenId),
          price: Moralis.Units.ETH(price).toString(),
        },
      },
    })
  }

  //get listing price required for the market
  const getMarketListingPrice = async () => {
    let listingPrice
    await contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: contractFunctions.GET_LISTING_PRICE,
      },
      onSuccess: (data) => (listingPrice = data),
      onError: (err) => {
        throw new Error(err)
      },
    })
    return listingPrice
  }

  // Prompt user to sign and approve market to trade his nft
  const getApprovalForAll = (contractAddress) => {
    contractProcessor.fetch({
      params: {
        contractAddress: contractAddress,
        abi: NFT_ABI,
        functionName: contractFunctions.SET_APPROVAL_FOR_ALL,
        params: {
          operator: MARKET_ADDRESS,
          approved: true,
        },
      },
    })
  }

  //checks if market is approved to transfer user NFT
  const checkIfApproved = async (contractAddress) => {
    let data
    await contractProcessor.fetch({
      params: {
        contractAddress: contractAddress,
        abi: NFT_ABI,
        functionName: contractFunctions.IS_APPROVED_FOR_ALL,
        params: {
          operator: MARKET_ADDRESS,
          owner: account,
        },
      },
      onSuccess: (result) => (data = result),
    })
    return data
  }

  //List item on marketplace
  const listItem = async (contractAddress, tokenId, price) => {
    const isMarketApproved = await checkIfApproved(contractAddress)
    const listingPrice = await getMarketListingPrice()
    if (!isMarketApproved) {
      getApprovalForAll(contractAddress)
    }
    if (isMarketApproved && listingPrice) {
      createMarketItem(listingPrice, contractAddress, tokenId, price)
    }
  }
  return { buyItem, listItem, updateItem, fetchMarketItems, mintToken, getMintCost }
}

export default useMarketInteractions
