import { createContext, useContext, useMemo } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"

// Context
const MoralisDataContext = createContext({})
export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis, account } = useMoralis()
  const { chain } = useChain()

  //prettier-ignore
  const {data: currentLaunchpad,isCurrentLaunchpadLoading,} = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", false).equalTo("isUpcoming", false).limit(1),[],{ live: true })
  //prettier-ignore
  const { data: completedLaunchpads } = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", true).equalTo("isUpcoming", false),[],{ live: true })
  //prettier-ignore
  const { data: upcomingLaunchpads } = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", true).equalTo("isUpcoming", true),[],{ live: true })
  //prettier-ignore
  const { data: allCollectionsListed } = useMoralisQuery("Launchpads",(q) => q.descending("createdAt"),[],{ live: true })
  //prettier-ignore
  const { data: allListings } = useMoralisQuery("MarketItems", (q) => q.equalTo('sold', false).descending("createdAt"),[],{ live: true })
  //prettier-ignore
  const {data: transactions} = useMoralisQuery('MarketItems', q => q.equalTo('sold', true).equalTo('confirmed', true).descending('updatedAt'), [],{live: true})
  //total sales volume
  const totalVolume = useMemo(() => {
    let result = 0
    transactions.forEach(
      (transaction) => (result += parseFloat(Moralis.Units.FromWei(transaction.attributes.price)))
    )
    return result.toFixed(2)
  }, [transactions])
  
  const value = {
    totalVolume,
    chain,
    account,
    Moralis,
    allCollectionsListed,
    allListings,
    currentLaunchpad,
    isCurrentLaunchpadLoading,
    completedLaunchpads,
    upcomingLaunchpads,
  }

  return <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
}

export default MoralisDataProvider
