import { createContext, useContext, useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { launchpadsState, allLaunchpadsState } from "../../store/store"
import { imagesState } from "../../store/imagesSlice"
import { listingsState } from "../../store/listingsSlice"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { useRouter } from "next/router"

const MoralisDataContext = createContext({})
export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { Moralis, account } = useMoralis()
  const { chain } = useChain()
  const router = useRouter()

  const setLaunchpads = useSetRecoilState(launchpadsState)
  const setListings = useSetRecoilState(listingsState)
  const setImages = useSetRecoilState(imagesState)
  const { featured } = useRecoilValue(allLaunchpadsState)

  const { data: allListings } = useMoralisQuery(
    "MarketItems",
    (q) => q.equalTo("sold", false).equalTo("confirmed", true).descending("createdAt"),
    [],
    { live: true }
  )
  const { data } = useMoralisQuery("Launchpads", (q) => q.descending("createdAt"), [], {
    live: true,
  })
  const { data: images } = useMoralisQuery("ItemImage")

  useEffect(() => {
    if (data) {
      setLaunchpads(data)
    }
  }, [data])
  useEffect(() => {
    if (images) {
      setImages(images)
    }
  }, [images])
  useEffect(() => {
    if (allListings) {
      setListings(allListings)
    }
  }, [allListings])

  useEffect(() => {
    router.prefetch("/marketplace")
    router.prefetch("/launchpad")
    if (account) {
      router.prefetch(`/user/${account}`)
    }
  }, [account])

  const value = {
    chain,
    account,
    Moralis,
  }

  return <MoralisDataContext.Provider value={value}>{children}</MoralisDataContext.Provider>
}

export default MoralisDataProvider
