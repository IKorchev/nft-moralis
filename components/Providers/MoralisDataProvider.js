import { useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { launchpadsState } from "../../store/store"
import { imagesState } from "../../store/imagesSlice"
import { chainState, currentUserState } from "../../store/userSlice"
import { listingsState } from "../../store/listingsSlice"
import { useSetRecoilState } from "recoil"

const MoralisDataProvider = ({ children }) => {
  const { account } = useMoralis()
  const { chain } = useChain()
  const setLaunchpads = useSetRecoilState(launchpadsState)
  const setImages = useSetRecoilState(imagesState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setChain = useSetRecoilState(chainState)
  const setListings = useSetRecoilState(listingsState)
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
  useEffect(() => {
    const imagesMap = new Map()
    images.map((el) =>
    imagesMap.set(`${el.attributes.contractAddress}_${el.attributes.tokenId}`, { ...el.attributes })
    )
    setImages(imagesMap), [images]})
  useEffect(() => setListings(allListings), [allListings])
  useEffect(() => setChain(chain), [chain])
  useEffect(() => setCurrentUser(account), [account])
  return null
}

export default MoralisDataProvider
