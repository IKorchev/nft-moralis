import { atom, selector, selectorFamily } from "recoil"

export const launchpadsState = atom({
  key: "launchpadsState",
  default: [],
})

export const allLaunchpadsState = selector({
  key: "allLaunchpadsState",
  get: ({ get }) => {
    const list = get(launchpadsState)
    //prettier-ignore
    const completed =  list.filter((el) => el.attributes.isUpcoming === false && el.attributes.finished === true)
    //prettier-ignore
    const upcoming  =  list.filter((el) => el.attributes.isUpcoming === true  && el.attributes.finished === true)
    //prettier-ignore
    const featured  =  list.filter((el) => el.attributes.isUpcoming === false && el.attributes.finished === false)[0]

    const filterOptions = list.map((el) => ({
      data: el.attributes.contractAddress,
      name: el.attributes.collectionName,
    }))

    return {
      completed,
      upcoming,
      featured,
      filterOptions,
    }
  },
})

export const findCollectionByAddress = selectorFamily({
  key: "findCollectionByContract",
  get: (contract) => {
    return ({ get }) => {
      const collections = get(launchpadsState)
      return collections.find((el) => el.attributes.contractAddress.toLowerCase() === contract.toLowerCase())
        ?.attributes
    }
  },
})
