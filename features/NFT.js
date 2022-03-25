import Moralis from "moralis"
import { toast } from "react-toastify"
import { contractFunctions } from "../utils/contractFunctions"
import { MARKET_ADDRESS, NFT_ABI } from "../utils/ABIS"

export class NFT {
  #ABI = NFT_ABI
  #MARKET_ADDRESS = MARKET_ADDRESS
  constructor(address, owner) {
    this._address = address
    this._owner = owner
  }

  // Checks if market is approved to transfer user NFT
  async checkIfApproved() {
    try {
      const options = {
        contractAddress: this._address,
        abi: this.#ABI,
        functionName: contractFunctions.IS_APPROVED_FOR_ALL,
        params: {
          operator: this.#MARKET_ADDRESS,
          owner: this._owner,
        },
      }
      const result = await Moralis.executeFunction(options)
      return result
    } catch (error) {
      return null
    }
  }
  async setApprovalForAll() {
    try {
      const options = {
        contractAddress: this._address,
        abi: this.#ABI,
        functionName: contractFunctions.SET_APPROVAL_FOR_ALL,
        params: {
          operator: this.#MARKET_ADDRESS,
          approved: true,
        },
      }
      const transaction = await Moralis.executeFunction(options)
      const result = await transaction.wait()
      return result
    } catch (error) {
      return null
    }
  }

  // Mints token to user address
  async mintToken(mintCost, mintAmount, toAddress) {
    // Show toast
    const id = toast.loading("Mint: Awaiting signature ...", {
      position: toast.POSITION.TOP_LEFT,
      closeButton: true,
      closeOnClick: true,
    })
    try {
      const options = {
        contractAddress: this._address,
        abi: this.#ABI,
        functionName: contractFunctions.MINT,
        msgValue: Moralis.Units.ETH(mintCost) * mintAmount,
        params: {
          _to: toAddress,
          _mintAmount: mintAmount,
        },
      }
      const transaction = await Moralis.executeFunction(options)
      const result = await transaction.wait()

      //If there is no result, the transaction has failed, show error toast
      if (!result) {
        toast.update(id, {
          type: "error",
          isLoading: false,
          render: "Error: Something went wrong. The transaction could not be processed.",
          autoClose: 5000,
        })
      }

      //If there's result show success toast and return the result
      toast.update(id, {
        type: "success",
        isLoading: false,
        render: "Mint: Successfully minted.",
        autoClose: 5000,
      })

      return result
    } catch (error) {
      //Catch any errors
      toast.update(id, {
        type: "error",
        isLoading: false,
        render: "Error: Something went wrong...",
        autoClose: 5000,
      })
      throw error
    }
  }
}
