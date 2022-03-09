import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <p>
        <Skeleton className='h-80 w-48' count={3} />
      </p>
    </SkeletonTheme>
  )
}
export default SkeletonCard
