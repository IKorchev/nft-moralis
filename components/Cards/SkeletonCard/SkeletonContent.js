import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonContent = () => {
  return (
    <SkeletonTheme color='#410e48' baseColor='#160518' highlightColor='#571260'>
      <div className='flex-col p-2'>
        <Skeleton height={10} width={120} />
        <Skeleton height={12} width={120} />
        <Skeleton height={25} width={100} />
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonContent
