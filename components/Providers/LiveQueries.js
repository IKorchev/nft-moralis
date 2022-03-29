import { useEffect } from "react"
import { useChain, useMoralis, useMoralisQuery } from "react-moralis"
import { useSetRecoilState } from "recoil"
import { launchpadsState } from "../../store/store"
import { imagesState } from "../../store/imagesSlice"
import { chainState, currentUserState } from "../../store/userSlice"
import { listingsState } from "../../store/listingsSlice"

const LiveQueries = () => {
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
    .equalTo('confirmed', true)
    .descending("createdAt"),
    [],
    { live: true }
  )
  const { data } = useMoralisQuery("Launchpads", (q) => q.descending("createdAt"), [], { live: true })
  const { data: images } = useMoralisQuery("ItemImage", (q) => q.descending("createdAt"), [], { live: true })

  useEffect(() => setLaunchpads(data), [data])
  useEffect(() => {
    const imagesMap = images.reduce((acc, curr) => {
      return acc.set(`${curr.attributes.contractAddress}_${curr.attributes.tokenId}`, { ...curr.attributes })
    }, new Map())
    setImages(imagesMap)
  }, [images])
  useEffect(() => setListings(allListings), [allListings])
  useEffect(() => setChain(chain), [chain])
  useEffect(() => setCurrentUser(account), [account])
  return null
}

export default LiveQueries
