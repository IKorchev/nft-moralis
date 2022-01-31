import { createContext, useContext, useState } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
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
  const { data: allListings } = useMoralisQuery("MarketItems",(q) => q.descending("createdAt"),[],{ live: true })

  const value = {
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
  
  return (
    <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
  )
}

export default MoralisDataProvider
