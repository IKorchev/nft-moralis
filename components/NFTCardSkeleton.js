import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonComponent = () => (
  <SkeletonTheme color='#28133a' highlightColor='#a43ad6'>
    <section className='flex flex-col mx-auto items-start mt-4 shadow-3xl bg-light m-1 rounded-lg'>
      <div className='mx-auto'>
        <Skeleton className='w-60 h-60 mx-auto' height={250} width={280} />
      </div>
      <div className='p-6 flex flex-col items-start justify-start'>
        <Skeleton className='' height={20} width={150} />
        <Skeleton className='mt-2' height={10} width={200} />
        <Skeleton className='mt-2' height={10} width={200} />
      </div>
      <div className='px-6 pb-2'>
        <Skeleton className='' height={20} width={110} />
      </div>
    </section>
  </SkeletonTheme>
)

export default SkeletonComponent
