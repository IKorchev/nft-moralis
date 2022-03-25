import { atom, selectorFamily } from "recoil"
import Moralis from "moralis"

export const currentUserState = atom({
  key: "currentUser",
  default: null,
})

export const chainState = atom({
  key: "chain",
  default: "0x3",
})

export const userNFTs = selectorFamily({
  key: "userNFTs",
  get:
    ({ address }) =>
    async ({ get }) => {
      const account = get(currentUserState)
      const chain = get(chainState)
      const res = await Moralis.Web3API.account.getNFTs({
        chain: chain?.chainId,
        address: address === "me" ? account : address,
      })
      console.log(res)
      return res.result
    },
})

export const userTransactions = selectorFamily({
  key: "userTransactions",
  get:
    ({ address }) =>
    async ({ get }) => {
      const account = get(currentUserState)
      const chain = get(chainState)
      const res = await Moralis.Web3API.account.getNFTTransfers({
        chain: chain?.chainId,
        address: address === "me" ? account : address,
      })
      console.log(res)
      return res
    },
})
