import { createContext, useContext, useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
const MoralisDataContext = createContext({})

export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { account } = useChain()
  Moralis.enableWeb3()
  const { data: allListings } = useMoralisQuery(
    "createMarketSale",
    (q) => q.notEqualTo("sold", true).equalTo("confirmed", true),
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
  }
  useEffect(() => {
    console.log(allListings)
  }, [allListings])
  return (
    <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
  )
}

export default MoralisDataProvider
