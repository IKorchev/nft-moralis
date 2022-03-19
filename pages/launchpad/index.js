import { Suspense } from "react"
import ItemsList from "../../components/Launchpad/ItemsList"
import Loading from "../../components/Other/Loading"
import Metadata from "../../components/Other/Metadata"
import { useRecoilValue } from "recoil"
import { allLaunchpadsState } from "../../store/store"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"

const Launchpad = () => {
  return (
    <>
      <Metadata title='NFT Explorer - Launchpad' />
      <Suspense fallback={<Loading />}>
        <FeaturedSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    </>
  )
}

const Main = () => {
  const { upcoming, completed } = useRecoilValue(allLaunchpadsState)

  return (
    <div className='container mx-auto px-6 py-24 lg:px-24'>
      <ItemsList title='Upcoming' items={upcoming} />
      <ItemsList title='Completed' items={completed} />
    </div>
  )
}

export default Launchpad
