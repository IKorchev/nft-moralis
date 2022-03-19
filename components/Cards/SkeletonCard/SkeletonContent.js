import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonContent = () => {
  return (
    <SkeletonTheme color='#410e48' baseColor='#160518' highlightColor='#571260'>
      <div className='flex-col p-2'>
        <Skeleton height={10} width={140} />
        <Skeleton height={12} width={140} />
        <Skeleton height={22} width={100} />
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonContent
