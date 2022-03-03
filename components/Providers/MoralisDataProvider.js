import { MARKET_ADDRESS } from "../../utils/ABIS"
import { createContext, useContext} from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { useMemo } from "react"
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
  const {data: userTransactions} = useMoralisQuery('MarketItems', q => q.equalTo('sold', true).equalTo('confirmed', true).descending('updatedAt'), [],{live: true})
  //total sales volume
  const totalVolume = useMemo(() => {
    let result = 0
    userTransactions.forEach(
      (transaction) => (result += parseFloat(Moralis.Units.FromWei(transaction.attributes.price)))
    )
    console.log(result.toFixed(2))
    return result.toFixed(2)
  }, [userTransactions])
  console.log(totalVolume)
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
