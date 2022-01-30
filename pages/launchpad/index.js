import Card from "../../components/Launchpad/Card"
import { useMoralisQuery } from "react-moralis"
import Loading from "../../components/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
const Launchpad = () => {
  // Featured (current) Launchpad
  //prettier-ignore
  const {data: currentLaunchpad,error,isLoading,} = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", false).equalTo("isUpcoming", false).limit(1),[],{ live: true })
  // Completed Launchpads
  //prettier-ignore
  const { data: completedLaunchpads } = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", true).equalTo("isUpcoming", false),[],{ live: true })
  // Upcoming Launchpads
  //prettier-ignore
  const { data: upcomingLaunchpads } = useMoralisQuery("Launchpads",(query) => query.equalTo("finished", true).equalTo("isUpcoming", true),[],{ live: true })

  if (isLoading)
    return (
      <Loading
        containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 200, color: "white" }}
      />
    )

  return (
    <div className='container mx-auto px-5 sm:px-24 lg:px-48'>
      {currentLaunchpad && !isLoading && (
        <FeaturedSection featuredCollection={currentLaunchpad[0]?.attributes} />
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
