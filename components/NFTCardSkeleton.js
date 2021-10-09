import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonComponent = () => (
  <SkeletonTheme color='#e4f5f3' highlightColor='#7DE2D1'>
    <section className='flex flex-col items-start shadow-3xl bg-white m-1 rounded-lg'>
      <div className='mx-auto'>
        <Skeleton className='w-60 h-60 mx-auto' height={180} width={210} />
      </div>
      <div className='p-6 flex flex-col items-start justify-start'>
        <Skeleton className='' height={20} width={200} />
        <Skeleton className='mt-2' height={30} width={200} />
      </div>
      <div className='px-6 pb-2'>
        <Skeleton className='' height={20} width={110} />
      </div>
    </section>
  </SkeletonTheme>
)

export default SkeletonComponent
