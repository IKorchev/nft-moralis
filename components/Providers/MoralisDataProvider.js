import { createContext, useContext, useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { launchpadsState, allLaunchpadsState } from "../../store/store"
import { imagesState } from "../../store/imagesSlice"
import { chainState, currentUserState } from "../../store/userSlice"
import { listingsState } from "../../store/listingsSlice"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { useRouter } from "next/router"

const MoralisDataContext = createContext({})
export const useMoralisData = () => {
  return useContext(MoralisDataContext)
}

const MoralisDataProvider = ({ children }) => {
  const { account } = useMoralis()
  const { chain } = useChain()

  const setLaunchpads = useSetRecoilState(launchpadsState)
  const setListings = useSetRecoilState(listingsState)
  const setImages = useSetRecoilState(imagesState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setChain = useSetRecoilState(chainState)
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
    useEffect(() => setLaunchpads(data), [data])
    useEffect(() => setImages(images), [images])
    useEffect(() => setListings(allListings),[allListings])
    useEffect(() => setChain(chain), [chain])
    useEffect(() => setCurrentUser(account), [account])


  return <MoralisDataContext.Provider>{children}</MoralisDataContext.Provider>
}

export default MoralisDataProvider
