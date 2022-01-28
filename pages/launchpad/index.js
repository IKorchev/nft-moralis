import Card from "../../components/Launchpad/Card"
import { useMoralisQuery } from "react-moralis"
import Loading from "../../components/Loading"
import FeaturedSection from "../../components/Launchpad/FeaturedSection"
const Launchpad = () => {
  const {
    data: currentLaunchpad,
    error,
    isLoading,
  } = useMoralisQuery("Launchpads", (query) => query.equalTo("finished", false).limit(1))
  console.log(currentLaunchpad[0])

  // const collectionAddress = "0x03ad64bf71db467cc96b3ef88967ee966ba54efd"
  const collectionAddress = "0x270cc76efcaed26308cf1919f0148e716b1cca83"
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
      <div className='container py-5 mx-auto mt-12'>
        <h1 className='text-3xl text-white border-b border-secondary-dark py-3'>
          Upcoming
        </h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 '>
          {[0, 1, 2, 3, 1, 3, 4, 5, 6, 7].map((el) => (
            <Card
              collectionAddress={collectionAddress}
              imageUrl='https://ipfs.pixura.io/ipfs/QmNgZHwD8HzUpZFqgigvurzREoqUrpVfGsFwkXxUfCnFjg'
            />
          ))}
        </div>
      </div>
      <div className='container py-12 mx-auto'>
        <h1 className='text-3xl text-white border-b border-secondary py-3'>Completed</h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 '>
          {[0, 1, 2, 3, 1, 3, 4, 5, 6, 7].map((el) => (
            <Card
              collectionAddress={collectionAddress}
              imageUrl='https://ipfs.pixura.io/ipfs/QmNgZHwD8HzUpZFqgigvurzREoqUrpVfGsFwkXxUfCnFjg'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Launchpad
