import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "../utils/ABIS"
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { toast } from "react-toastify"

const useMarketInteractions = () => {
  const contractFunctions = {
    BUY_ITEM: "createMarketSale",
    LIST_ITEM: "createMarketItem",
    GET_LISTING_PRICE: "getListingPrice",
    IS_APPROVED_FOR_ALL: "isApprovedForAll",
    SET_APPROVAL_FOR_ALL: "setApprovalForAll",
    APPROVE: "approve",
    COST: "cost",
    MINT: "mint",
    MAX_SUPPLY: "maxSupply",
    TOTAL_SUPPLY: "totalSupply",
    CREATE_MARKET_ITEM: "createMarketItem",
  }
  const { Moralis, account } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const { chain } = useChain()
  const MarketItems = Moralis.Object.extend("MarketItems")
  const query = new Moralis.Query(MarketItems)

  //update in moralis database
  const updateItem = async (itemId) => {
    query.equalTo("itemId", itemId).equalTo("confirmed", true)
    const result = await query.first()
    console.log(result)
    result.set("sold", true)
    result.set("owner", account)
    result.save()
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

  //gets the amount of tokens that have been minted so far for a given contract
  const getTotalSupply = async (contractAddress) => {
    let mintedAmount
    await contractProcessor.fetch({
      params: {
        abi: NFT_ABI,
        contractAddress: contractAddress,
        functionName: contractFunctions.TOTAL_SUPPLY,
      },
      onError: (err) => console.log(err),
      onSuccess: (data) => (mintedAmount = data),
    })
    return mintedAmount
  }

  //gets max supply of tokens for given contract
  const getMaxSupply = async (contractAddress) => {
    let maxSupply
    await contractProcessor.fetch({
      params: {
        abi: NFT_ABI,
        contractAddress: contractAddress,
        functionName: contractFunctions.MAX_SUPPLY,
      },
      onError: (err) => console.log(err),
      onSuccess: (data) => (maxSupply = data),
    })
    return maxSupply
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

  // buy NFT from Market
  const buyItem = async (nftContract, itemId, price) => {
  await  contractProcessor.fetch({
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
      onSuccess: (data) => console.log("Success "),
      onError: (err) => console.log("Error"),
      onComplete: (data) => console.log("Complete"),
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
  return {
    buyItem,
    listItem,
    updateItem,
    mintToken,
    getMintCost,
    getMaxSupply,
    getTotalSupply,
  }
}

export default useMarketInteractions
