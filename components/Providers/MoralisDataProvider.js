import { createContext, useContext, useState } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
const MoralisDataContext = createContext({})

export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { account, chain } = useChain()

  Moralis.enableWeb3()
  const { data: allListings } = useMoralisQuery(
    "MarketItems",
    (q) => q.equalTo("confirmed", true),
    [],
    {
      live: true,
    }
  )
  const getItems = async (address, tokenId) => {
    const MarketItems = Moralis.Object.extend("MarketItems")
    const query = new Moralis.Query(MarketItems)
    query.equalTo("confirmed", true).equalTo("owner", account)
    const results = await query.find()
    console.log(results)
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
    allListings,
    soldListings,
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
