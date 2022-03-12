import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const SkeletonContent = () => {
  return (
    <SkeletonTheme color='#63052f' baseColor='#310218' highlightColor='#4a0423'>
      <div className='hidden flex-col p-2'>
        <Skeleton height={14} width={150} />
        <Skeleton height={14} width={150} />
        <Skeleton height={25} width={100} />
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonContent
