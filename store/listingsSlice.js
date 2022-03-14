import { atom, selector } from "recoil"

export const filterState = atom({
  key: "filterState",
  default: null,
})
export const sortState = atom({
  key: "sortState",
  default: null,
})
export const listingsState = atom({
  key: "listingsState",
  default: [],
})

export const filterListings = selector({
  key: "filterListings",
  get: ({ get }) => {
    const filter = get(filterState)
    const listings = get(listingsState)
    if (filter) {
      return listings.filter(
        (el) => el.attributes.nftContract.toLowerCase() === filter.toLowerCase()
      )
    } else {
      return listings
    }
  },
})

