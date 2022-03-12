import SkeletonContent from "./SkeletonContent"
import SkeletonImage from "./SkeletonImage"

const SkeletonCard = () => {
  return (
    <div className='bg-secondary-800 h-72 w-48 rounded-md lg:h-[21rem] lg:w-60'>
      <SkeletonImage />
      <SkeletonContent />
    </div>
  )
}
export default SkeletonCard
