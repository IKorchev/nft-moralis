import Card from "../../components/Launchpad/Card"
import Loading from "../../components/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
const Launchpad = () => {
  // Featured (current) Launchpad
  //prettier-ignore
  const { currentLaunchpad, isCurrentLaunchpadLoading, completedLaunchpads, upcomingLaunchpads } = useMoralisData()
  if (isCurrentLaunchpadLoading) return <Loading />
  return (
    <div className='container mx-auto px-6 py-12 lg:px-24'>
      {currentLaunchpad && !isCurrentLaunchpadLoading && (
        <FeaturedSection featuredCollection={currentLaunchpad[0]?.attributes} />
      )}
      <div className='container mx-auto py-12'>
        <h1 className='border-b border-secondary py-3 text-3xl text-white'>Upcoming</h1>
        <div className='styled-scrollbar mt-5 flex w-full gap-5 overflow-auto px-2 py-4 '>
          {upcomingLaunchpads.map((el) => (
            <Card
              collectionAddress={el.attributes.contractAddress}
              imageUrl={el.attributes.imageUrl}
              name={el.attributes.collectionName}
            />
          ))}
        </div>
      </div>
      <div className='container mx-auto mt-12 py-5'>
        <h1 className='border-b border-secondary-dark py-3 text-3xl text-white'>Completed</h1>
        <div className='styled-scrollbar mt-5 flex w-full gap-5 overflow-auto px-2 py-4 '>
          {completedLaunchpads.map((el) => (
            <Card
              key={el.attributes.imageUrl}
              collectionAddress={el.attributes.contractAddress}
              imageUrl={el.attributes.imageUrl}
              name={el.attributes.collectionName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Launchpad
