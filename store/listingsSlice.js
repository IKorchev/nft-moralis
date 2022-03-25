import Moralis from "moralis"
import { atom, selector, selectorFamily } from "recoil"
export const filterState = atom({
  key: "filterState",
  default: null,
})

export const sortState = atom({
  key: "sortState",
  default: "price-asc",
})
export const listingsState = atom({
  key: "listingsState",
  default: [],
})

export const sortFn = (a, b, sortBy) => {
  switch (sortBy) {
    case "date-asc":
      return a.createdAt - b.createdAt
    case "date-desc":
      return b.createdAt - a.createdAt
    case "price-asc":
      return parseFloat(a.attributes.price) - parseFloat(b.attributes.price)
    case "price-desc":
      return parseFloat(b.attributes.price) - parseFloat(a.attributes.price)
    case "id-asc":
      return parseFloat(a.attributes.tokenId) - parseFloat(b.attributes.tokenId)
    case "id-desc":
      return parseFloat(b.attributes.tokenId) - parseFloat(a.attributes.tokenId)
  }
}

export const sortOptions = [
  { name: "Newest first", data: "date-desc" },
  { name: "Oldest first", data: "date-asc" },
  { name: "Price: Low to High", data: "price-asc" },
  { name: "Price: High to Low", data: "price-desc" },
  { name: "ID: Ascending", data: "id-asc" },
  { name: "ID: Descending", data: "id-desc" },
]

export const listingsByContract = selectorFamily({
  key: "listingsByContract",
  get:
    (contract) =>
    ({ get }) => {
      const listed = get(listingsState)
      const listings = listed.filter((el) => el.attributes.nftContract.toLowerCase() === contract.toLowerCase())
      return listings
    },
})

export const sortedListings = selector({
  key: "sortedListings",
  get: ({ get }) => {
    const listings = get(listingsState)
    const sortBy = get(sortState)
    return [...listings].sort((a, b) => sortFn(a, b, sortBy))
  },
})

export const collectionInfo = selectorFamily({
  key: "collectionInfo",
  get:
    (params) =>
    ({ get }) => {
      const listed = get(listingsByContract(params))
      const cheapest = [...listed].sort((a, b) => parseFloat(a.attributes.price) - parseFloat(b.attributes.price))[0]
      const listedCount = listed.length
      const floor = cheapest && Moralis.Units.FromWei(cheapest?.attributes.price)
      const filterOptions = listed.map((el) => ({
        name: el.attributes.collectionName,
        data: el.attributes.contractAddress,
      }))
      return {
        listedCount,
        floor,
        filterOptions,
        name: cheapest?.attributes.collectionName,
      }
    },
})
