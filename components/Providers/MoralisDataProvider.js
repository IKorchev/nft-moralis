import { createContext, useContext, useState } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
const MoralisDataContext = createContext({})

export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis, account, enableWeb3 } = useMoralis()
  const { chain } = useChain()
  

  const getItems = async (address, tokenId) => {
    const MarketItems = Moralis.Object.extend("MarketItems")
    const query = new Moralis.Query(MarketItems)
    query.equalTo("confirmed", true).equalTo("owner", account)
    const results = await query.find()
  }
  const { data: soldListings } = useMoralisQuery(
    "MarketItems",
    (q) => q.equalTo("confirmed", true).notEqualTo("sold", true).ascending("date"),
    [],
    {
      live: true,
    }
  )
  const value = {
    chain,
    account,
    Moralis,
    getItems,
  }
  return (
    <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
  )
}

export default MoralisDataProvider
