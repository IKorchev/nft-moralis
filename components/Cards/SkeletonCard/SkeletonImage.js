import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonImage = () => {
  return (
    <SkeletonTheme color='#63052f' baseColor='#310218' highlightColor='#4a0423'>
      <div className='hidden lg:block'>
        <Skeleton height={240} />
      </div>
      <div className='block lg:hidden'>
        <Skeleton height={190} />
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonImage
