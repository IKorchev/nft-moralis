import { createContext, useContext, useState } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
const MoralisDataContext = createContext({})

export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis, account, enableWeb3 } = useMoralis()
  const { chain } = useChain()

  const value = {
    chain,
    account,
    Moralis,
  }
  return (
    <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
  )
}

export default MoralisDataProvider
