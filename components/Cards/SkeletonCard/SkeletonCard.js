import SkeletonContent from "./SkeletonContent"
import SkeletonImage from "./SkeletonImage"

const SkeletonCard = () => {
  return (
    <div className='border-secondary-600 bg-secondary-900 shadow-glass relative flex h-72 w-48 flex-col overflow-hidden  rounded-md border text-white lg:h-[21rem] lg:w-60'>
      <SkeletonImage />
      <SkeletonContent />
    </div>
  )
}
export default SkeletonCard
