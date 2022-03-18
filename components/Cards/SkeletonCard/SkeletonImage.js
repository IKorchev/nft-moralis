import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonImage = () => {
  return (
    <SkeletonTheme color='#410e48' baseColor='#160518' highlightColor='#571260'>
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
