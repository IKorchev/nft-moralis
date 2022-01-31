import Card from "../../components/Launchpad/Card"
import { useMoralisQuery } from "react-moralis"
import Loading from "../../components/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
const Launchpad = () => {
  // Featured (current) Launchpad
  //prettier-ignore
  const { currentLaunchpad, isCurrentLaunchpadLoading, completedLaunchpads, upcomingLaunchpads } = useMoralisData()
  if (isCurrentLaunchpadLoading)
    return (
      <Loading
        containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 200, color: "white" }}
      />
    )

  return (
    <div className='container mx-auto px-6 lg:px-24'>
      {currentLaunchpad && !isCurrentLaunchpadLoading && (
        <div className=''>
          <FeaturedSection featuredCollection={currentLaunchpad[0]?.attributes} />
        </div>
      )}
      <div className='container py-12 mx-auto'>
        <h1 className='text-3xl text-white border-b border-secondary py-3'>Upcoming</h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 '>
          {upcomingLaunchpads.map((el) => (
            <Card
              collectionAddress={el.attributes.contractAddress}
              imageUrl={el.attributes.imageUrl}
              name={el.attributes.collectionName}
            />
          ))}
        </div>
      </div>
      <div className='container py-5 mx-auto mt-12'>
        <h1 className='text-3xl text-white border-b border-secondary-dark py-3'>
          Completed
        </h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 '>
          {completedLaunchpads.map((el) => (
            <Card
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
