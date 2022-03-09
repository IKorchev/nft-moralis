import Loading from "../../components/Other/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
import { useMoralisData } from "../../components/Providers/MoralisDataProvider"
import Metadata from "../../components/Other/Metadata"
import CollectionCard from "../../components/Cards/CollectionCard/CollectionCard"
import  SectionTitle  from "../../components/SectionTitle"
const Launchpad = () => {
  //prettier-ignore
  const { currentLaunchpad, isCurrentLaunchpadLoading, completedLaunchpads, upcomingLaunchpads } = useMoralisData()

  if (isCurrentLaunchpadLoading) return <Loading />
  return (
    <>
      <div style={{}}>
        <Metadata title='NFT Explorer - Launchpad' />
        <div className='container mx-auto px-6 py-24 lg:px-24'>
          {currentLaunchpad && !isCurrentLaunchpadLoading && (
            <FeaturedSection featuredCollection={currentLaunchpad[0]?.attributes} />
          )}
          <div className='container mx-auto divide-y divide-secondary py-6'>
            <div className='my-3 text-left'>
              <SectionTitle size='sm' title='Upcoming' />
            </div>
            <div className='styled-scrollbar mt-5 flex w-full gap-5 overflow-auto  bg-primary-900/90 px-2 py-6 backdrop-blur-sm backdrop-filter '>
              {upcomingLaunchpads.map((el) => {
                return (
                  <CollectionCard
                    collectionAddress={el.attributes.contractAddress}
                    imageUrl={el.attributes.imageUrl}
                    name={el.attributes.collectionName}
                  />
                )
              })}
            </div>
          </div>
          <div className='container mx-auto divide-y divide-secondary py-6'>
            <div className='my-3 text-left'>
              <SectionTitle size='sm' title='Completed' />
            </div>
            <div className='styled-scrollbar mt-5 flex w-full gap-5 overflow-auto bg-primary-900/90 px-2 py-6 backdrop-blur-sm backdrop-filter  '>
              {completedLaunchpads.map((el) => (
                <CollectionCard
                  key={el.attributes.imageUrl}
                  collectionAddress={el.attributes.contractAddress}
                  imageUrl={el.attributes.imageUrl}
                  name={el.attributes.collectionName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Launchpad
