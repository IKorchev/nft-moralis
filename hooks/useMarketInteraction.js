import { MARKET_ABI, MARKET_ADDRESS, NFT_ABI } from "../utils/ABIS"
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis"
import { toast } from "react-toastify"
import { contractFunctions } from "./contractFunctions"
import { useRecoilValue } from "recoil"
import { currentUserState } from "../store/userSlice"

const useMarketInteractions = () => {
  const { Moralis } = useMoralis()
  const account = useRecoilValue(currentUserState)
  const contractProcessor = useWeb3ExecuteFunction()

  // Updates the item to be 'sold' and owner ' moralis database
  const updateItemSold = async (itemId, buyer) => {
    await fetch("/api/nft", {
      method: "PATCH",
      body: JSON.stringify({ itemId, buyer }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  // Save item image in database
  const saveItemInMoralisDatabase = async (nftObject) => {
    const res = await fetch("/api/nft", {
      method: "POST",
      body: JSON.stringify({ nftObject }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res
  }

  // Mints token to user address
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

  // Buy NFT from Market
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
      onSuccess: (data) => {
        updateItemSold(itemId, account)
        toast.success("Item purchase successful.", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 4000,
        })
      },
      onError: (err) => {
        const splitMessage = err.message.split("(")[0]
        toast.error(splitMessage, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 4000,
        })
      },
    })
  }

  // Place item on sale
  const createMarketItem = async (listingPrice, nftObject, price) => {
    const data = await contractProcessor.fetch({
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
      onSuccess: async () => {
        await saveItemInMoralisDatabase(nftObject)
        return { status: "success" }
      },
      onError: (err) => ({ status: "success" }),
      onComplete: (data) => console.log(data),
    })
    console.log(data)
    return data
  }

  // Get listing price required for the market
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
  const getApprovalForAll = async (contractAddress) => {
    await contractProcessor.fetch({
      params: {
        contractAddress: contractAddress,
        abi: NFT_ABI,
        functionName: contractFunctions.SET_APPROVAL_FOR_ALL,
        params: {
          operator: MARKET_ADDRESS,
          approved: true,
        },
      },
      onSuccess: (e) => console.log(e),
      onComplete: (e) => console.log(e),
      onError: (e) => console.log(e),
    })
  }

  // Checks if market is approved to transfer user NFT
  const checkIfApproved = async (contractAddress) => {
    let isApproved
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
      onSuccess: (result) => (isApproved = result),
      onError: (err) => {
        throw new Error(err)
      },
    })
    return isApproved
  }

  // List item on marketplace
  const listItem = async (nftObject, price) => {
    const isMarketApproved = await checkIfApproved(nftObject.contractAddress)
    const listingPrice = await getMarketListingPrice()
    // If listing price was not fetched, send error
    if (!listingPrice) {
      return "error"
    }
    // If contract is not approved, prompt approval
    if (!isMarketApproved) {
      getApprovalForAll(nftObject.contractAddress).then(() => createMarketItem(listingPrice, nftObject, price))
    }
    // Create the sale
    else {
      const { status } = await createMarketItem(listingPrice, nftObject, price)
      return status?.error ? "error" : "success"
    }
  }

  return {
    buyItem,
    listItem,
    updateItemSold,
    mintToken,
  }
}

export default useMarketInteractions
