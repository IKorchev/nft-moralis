import { Suspense } from "react"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
import Metadata from "../../components/Other/Metadata"
import CompletedList from "../../components/Launchpad/CompletedList"
import UpcomingList from "../../components/Launchpad/UpcomingList"
import Loading from "../../components/Other/Loading"

const Launchpad = () => {
  return (
    <>
      <Metadata title='NFT Explorer - Launchpad' />
      <div className='container mx-auto px-6 py-24 lg:px-24'>
        <Suspense fallback={<Loading />}>
          <FeaturedSection />
          <UpcomingList />
          <CompletedList />
        </Suspense>
      </div>
    </>
  )
}

export default Launchpad


