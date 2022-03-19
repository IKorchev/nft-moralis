import { createContext, useContext, useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { launchpadsState } from "../../store/store"
import { imagesState } from "../../store/imagesSlice"
import { chainState, currentUserState } from "../../store/userSlice"
import { listingsState } from "../../store/listingsSlice"
import { useSetRecoilState } from "recoil"

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
  //prettier-ignore
  const { data: allListings } = useMoralisQuery(
    "MarketItems",
    (query) => query
    .equalTo("sold", false)
    .equalTo("confirmed", true)
    .descending("createdAt"),
    [],
    { live: true }
  )
  const { data } = useMoralisQuery("Launchpads", (query) => query.descending("createdAt"), [], { live: true })
  const { data: images } = useMoralisQuery("ItemImage")
  useEffect(() => setLaunchpads(data), [data])
  useEffect(() => setImages(images), [images])
  useEffect(() => setListings(allListings), [allListings])
  useEffect(() => setChain(chain), [chain])
  useEffect(() => setCurrentUser(account), [account])

  return <MoralisDataContext.Provider>{children}</MoralisDataContext.Provider>
}

export default MoralisDataProvider
