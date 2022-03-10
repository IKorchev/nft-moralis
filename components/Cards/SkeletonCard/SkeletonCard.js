import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonCard = () => {
  return (
    <SkeletonTheme color='#63052f' baseColor='#310218' highlightColor='#4a0423'>
      <div className='bg-secondary-800 h-72 w-48 rounded-md lg:h-80 lg:w-60'>
        <div className='hidden lg:block'>
          <Skeleton height={220} />
          <div className='flex flex-col p-2'>
            <Skeleton height={14} width={150} />
            <Skeleton height={14} width={150} />
            <Skeleton height={25} width={100} />
          </div>
        </div>
        <div className='lg:hidden'>
          <Skeleton height={190} />
          <div className='flex flex-col p-2'>
            <Skeleton height={14} width={150} />
            <Skeleton height={14} width={150} />
            <Skeleton height={25} width={100} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}
export default SkeletonCard
