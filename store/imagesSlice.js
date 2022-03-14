import { atom, selectorFamily } from "recoil"

export const imagesState = atom({
  key: "imagesState",
  default: [],
})

export const getItem = selectorFamily({
  key: "getItem",
  get:
    ({ tokenId, nftContract }) =>
    ({ get }) => {
      const imagesList = get(imagesState)

      let item = imagesList.find(
        (el) =>
          el.attributes.tokenId == tokenId &&
          nftContract.toLowerCase() === el.attributes.contractAddress.toLowerCase()
      )
      return item
    },
})
