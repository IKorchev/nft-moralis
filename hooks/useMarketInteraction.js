import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "../utils/ABIS"
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
const useMarketInteractions = () => {
  const contractFunctions = {
    BUY_ITEM: "createMarketSale",
    LIST_ITEM: "createMarketItem",
    GET_LISTING_PRICE: "getListingPrice",
    IS_APPROVED_FOR_ALL: "isApprovedForAll",
    SET_APPROVAL_FOR_ALL: "setApprovalForAll",
    APPROVE: "approve",
    FETCH_MARKET_ITEMS: "fetchMarketItems",
  }
  const { Moralis } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const { account, chain } = useChain()
  const createMarketSale = Moralis.Object.extend("createMarketSale")
  const query = new Moralis.Query(createMarketSale)

  const fetchMarketItems = async () => {
    await contractProcessor.fetch({
      params: {
        abi: MARKET_ABI,
        contractAddress: MARKET_ADDRESS,
        functionName: "fetchMarketItems",
      },
      onSuccess: (data) => console.log(data),
      onError: (err) => console.log(err),
    })
  }
  const updateItem = async (itemId) => {
    query.equalTo("itemId", itemId).equalTo("confirmed", true)
    const result = await query.first()
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

  // Place item on sale

  const createMarketItem = (listingPrice, contractAddress, tokenId, price) => {
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
  }

  const getListingPriceAndListItemOnMarket = async (contractAddress, tokenId, price) => {
    contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "getListingPrice",
      },
      onSuccess: (listingPrice) =>
        createMarketItem(listingPrice, contractAddress, tokenId, price),
      onError: () => {
        console.log("Unable to get listing price")
      },
    })
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

  const listItem = async (contractAddress, tokenId, price) => {
    // CHECK IF USER HAS APPROVED THE MARKET TO TRANSFER HIS NFT'S
    contractProcessor.fetch({
      params: {
        contractAddress: contractAddress,
        abi: NFT_ABI,
        functionName: contractFunctions.IS_APPROVED_FOR_ALL,
        params: {
          operator: MARKET_ADDRESS,
          owner: account,
        },
      },
      onSuccess: (data) => {
        if (!data) getApprovalForAll(contractAddress)
        if (data) getListingPriceAndListItemOnMarket(contractAddress, tokenId, price)
      },
      onError: (err) => alert("Something went wrong " + err),
    })
  }

  return { buyItem, listItem, updateItem, fetchMarketItems }
}

export default useMarketInteractions
