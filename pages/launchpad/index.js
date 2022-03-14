import { useEffect } from "react"
import Loading from "../../components/Other/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import Metadata from "../../components/Other/Metadata"

import { useSetRecoilState } from "recoil"
import { allLaunchpadsState } from "../../store/store"
import CompletedList from "../../components/Launchpad/CompletedList"
import UpcomingList from "../../components/Launchpad/UpcomingList"
import { useRecoilValue } from "recoil"

const Launchpad = () => {
  const { featured } = useRecoilValue(allLaunchpadsState)

  return (
    <div>
      <Metadata title='NFT Explorer - Launchpad' />
      <div className='container mx-auto px-6 py-24 lg:px-24'>
        <FeaturedSection featuredCollection={featured} />
        <UpcomingList />
        <CompletedList />
      </div>
    </div>
  )
}

export default Launchpad
