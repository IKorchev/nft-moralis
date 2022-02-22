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
  const ItemImage = Moralis.Object.extend("ItemImage")

  //update in moralis database
  const updateItemSold = async (itemId) => {
    const query = new Moralis.Query(MarketItems)
    query.equalTo("itemId", itemId).equalTo("sold", false)
    const result = await query.first()
    result.set("sold", true)
    result.set("owner", account)
    result.save()
  }
  const saveItemInMoralisDatabase = async (nftObject) => {
    // Query the Items Images collection
    const query = new Moralis.Query(ItemImage)
      .equalTo("contractAddress", nftObject.contractAddress)
      .equalTo("tokenId", nftObject.tokenId)
    const result = await query.find()
    //make sure item doesn't exist
    if (result.length >= 1) {
      return
    }
    // Continue saving the Item in the database.
    const Item = new ItemImage()
    Item.set(
      "image",
      nftObject.metadata.image || nftObject.metadata.image_url || nftObject.metadata.url
    )
    Item.set("format", nftObject.metadata.format)
    Item.set("contractAddress", nftObject.contractAddress)
    Item.set("tokenId", nftObject.tokenId)
    Item.set("name", nftObject.metadata.name)
    Item.save()
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
    await contractProcessor.fetch({
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
      onSuccess: (data) => updateItemSold(itemId),
    })
  }

  // Place item on sale
  const createMarketItem = async (listingPrice, nftObject, price) => {
    let status
    await contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: contractFunctions.CREATE_MARKET_ITEM,
        msgValue: listingPrice,
        params: {
          nftContract: nftObject.contractAddress,
          tokenId: parseInt(nftObject.tokenId),
          price: Moralis.Units.ETH(price).toString(),
        },
      },
      onSuccess: (result) => {
        status = "success"
        saveItemInMoralisDatabase(nftObject)
      },
      onError: (err) => {
        status = "error"
      },
    })
    return status
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
  const listItem = async (nftObject, price) => {
    // saveItemInMoralisDatabase(nftObject)
    const isMarketApproved = await checkIfApproved(nftObject.contractAddress)
    const listingPrice = await getMarketListingPrice()
    if (!isMarketApproved) {
      getApprovalForAll(nftObject.contractAddress)
    }
    if (isMarketApproved && listingPrice) {
      const result = await createMarketItem(listingPrice, nftObject, price)
      return result
    }
  }
  return {
    buyItem,
    listItem,
    updateItemSold,
    mintToken,
    getMintCost,
    getMaxSupply,
    getTotalSupply,
  }
}

export default useMarketInteractions
