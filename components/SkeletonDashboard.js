import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonDashboard = () => {
  return (
    <SkeletonTheme color='#28133a' highlightColor='#a43ad6'>
      <section className=' mx-auto mt-24 bg-primary-lightest backdrop-filter backdrop-blur-md bg-opacity-5 rounded-lg p-5 shadow-4xl'>
        <div className='mx-auto flex justify-between'>
          <Skeleton className='w-60 h-60 mx-auto' height={25} width={150} />
          <Skeleton className='w-60 h-60 mx-auto' height={25} width={150} />
          <Skeleton className='w-60 h-60 mx-auto' height={20} width={150} />
        </div>
        <div className='flex flex-col justify-evenly divide-primary-lightest divide-y-2 items-start lg:w-[800px] overflow-hidden w-[600px] mt-12'>
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
          <Skeleton height={30} width={900} />
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonDashboard
