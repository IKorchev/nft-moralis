import Moralis from "moralis"
import { toast } from "react-toastify"
import { contractFunctions } from "../utils/contractFunctions"
import { MARKET_ABI, MARKET_ADDRESS } from "../utils/ABIS"
import { NFT } from "./NFT"

export class Market {
  #address = MARKET_ADDRESS
  #abi = MARKET_ABI
  #options = {
    contractAddress: this.#address,
    abi: this.#abi,
  }

  get address() {
    return this.#address
  }

  // Save item image in database
  async #saveItemInMoralisDatabase(nftObject) {
    const res = await fetch("/api/nft", {
      method: "POST",
      body: JSON.stringify({ nftObject }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res
  }

  async #updateItemSold(itemId, buyer) {
    await fetch("/api/nft", {
      method: "PATCH",
      body: JSON.stringify({ itemId, buyer }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async #getListingPrice() {
    try {
      return await Moralis.executeFunction({
        ...this.#options,
        functionName: contractFunctions.GET_LISTING_PRICE,
      })
    } catch (error) {
      return null
    }
  }

  async listItem(nftObject, price) {
    const id = toast.loading("Listing: Awaiting signature ..", {
      position: toast.POSITION.TOP_LEFT,
      closeOnClick: true,
      closeButton: true,
    })
    try {
      const nft = new NFT(nftObject.contractAddress, nftObject.owner)
      const value = await this.#getListingPrice()
      const writeOptions = {
        ...this.#options,
        functionName: contractFunctions.CREATE_MARKET_ITEM,
        msgValue: value,
        params: {
          nftContract: nftObject.contractAddress,
          tokenId: parseInt(nftObject.tokenId),
          price: Moralis.Units.ETH(price).toString(),
        },
      }
      // If the market is not approved to trade owner's NFT, prompt setApprovalForAll()
      if (!(await nft.checkIfApproved())) {
        toast.update(id, {
          render: "Approval: You need to approve the Market to trade this NFT.",
        })
        const res = await nft.setApprovalForAll()
        if (!res) {
          toast.update(id, {
            type: "error",
            isLoading: false,
            autoClose: 5000,
            render: "Error: Failed to approve contract.",
          })
          return
        }
      }
      toast.update(id, {
        render: "Listing: Awaiting signature ...",
      })
      const transaction = await Moralis.executeFunction(writeOptions)
      toast.update(id, {
        render: "Listing: Transaction is being processed ...",
      })
      const result = await transaction.wait()
      toast.update(id, {
        isLoading: false,
        type: "default",
        render: `Listing: ${nftObject.name} listed successfully!`,
      })
      this.#saveItemInMoralisDatabase(nftObject)
      return result
    } catch (error) {
      toast.update(id, {
        type: "error",
        render: "Error: Something went wrong. Try again later.",
      })
    }
  }

  // Buy NFT from Market
  async buyItem(nftContract, itemId, price) {
    const id = toast.loading("Buy item: Awaiting signature...", {
      position: toast.POSITION.TOP_LEFT,
      closeButton: true,
      closeOnClick: true,
    })
    try {
      const writeOptions = {
        ...this.#options,
        functionName: contractFunctions.BUY_ITEM,
        msgValue: price,
        params: {
          nftContract,
          itemId,
        },
      }
      const transaction = await Moralis.executeFunction(writeOptions)
      const result = await transaction.wait()
      toast.update(id, {
        isLoading: false,
        type: "success",
        render: `Buy Item: ${nftObject.name} purchased successfully`,
        autoClose: 5000,
      })
      this.#updateItemSold()
      return result
    } catch (error) {
      toast.update(id, {
        isLoading: false,
        type: "error",
        render: `Error: ${error.message.split("(")[0]}`,
        autoClose: 5000,
      })
      return error
    }
  }

  async fetchItems() {
    const readOptions = {
      ...this.#options,
      functionName: contractFunctions.FETC,
    }
    const result = await Moralis.executeFunction(readOptions)
    const items = result.map((el) => ({
      itemId: Number(el.itemId),
      nftContract: el.nftContract,
      tokenId: Number(el.tokenId),
      seller: el.seller,
      owner: el.owner,
      price: parseFloat(Moralis.Units.FromWei(el.price)),
      sold: el.sold,
    }))
    return items
  }
}
