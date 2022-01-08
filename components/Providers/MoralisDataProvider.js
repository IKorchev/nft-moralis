import { createContext, useContext } from "react"
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
    "createMarketSale",
    (q) => q.notEqualTo("sold", false).equalTo("confirmed", true),
    [],
    {
      live: true,
    }
  )

  const { data: soldListings } = useMoralisQuery(
    "createMarketSale",
    (q) => q.equalTo("confirmed", true).notEqualTo("sold", true).ascending("date"),
    [],
    {
      live: true,
    }
  )
  const value = {
    allListings,
    soldListings,
    chain
  }
  return (
    <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
  )
}

export default MoralisDataProvider
