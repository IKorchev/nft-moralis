import { atom, selector } from "recoil"

export const launchpadsState = atom({
  key: "launchpadsState",
  default: [],
})

export const allLaunchpadsState = selector({
  key: "completedLaunchpads",
  get: ({ get }) => {
    const list = get(launchpadsState)
    return {
      //prettier-ignore
      completed: list.filter((el) => el.attributes.isUpcoming === false && el.attributes.finished === true),
      upcoming:  list.filter((el) => el.attributes.isUpcoming === true && el.attributes.finished === true),
      featured:  list.filter((el) => el.attributes.isUpcoming === false && el.attributes.finished === false)[0]
    }
  },
})

