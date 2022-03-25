import { atom, selectorFamily } from "recoil"

export const imagesState = atom({
  key: "imagesState",
  default: new Map(),
})

export const itemImage = selectorFamily({
  key: "itemImage",
  get:
    ({ nftContract, tokenId }) =>
    ({ get }) => {
      const allImages = get(imagesState)
      return allImages.get(`${nftContract}_${tokenId}`)
    },
})
