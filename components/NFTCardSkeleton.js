import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonComponent = () => (
  <SkeletonTheme color='#c8d1e0' highlightColor='#f2f3f5'>
    <section className='flex flex-col items-start justify-start p-4 bg-white m-1 rounded-lg'>
      <Skeleton className='w-60 h-60' height={180} width={200} />
      <Skeleton className='mt-4' height={20} width={200} />
      <Skeleton className='mt-2' height={30} width={200} />
      <div>
        <Skeleton className='mt-2 ml-0' height={20} width={80} />
      </div>
    </section>
  </SkeletonTheme>
)

export default SkeletonComponent
