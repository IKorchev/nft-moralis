import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "launchpads",
  initialState: [],
  reducers: {
    filterByCollection: (state, action) => {
      state = state.filter((el) => el !== action.payload)
    },
    sortBy: (state) => {
      state = state.sort((el) => el !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
