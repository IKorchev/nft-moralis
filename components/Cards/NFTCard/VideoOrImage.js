import React from "react"
const VideoOrImage = ({ format, url }) => {
  return (
    <div className=' h-max w-full '>
      {format === "video" ? (
        <video
          autoPlay
          muted
          controls
          src={url || null}
          alt=''
          className='h-full w-full cursor-pointer rounded-lg object-contain'
        />
      ) : (
        <img src={url || null} alt='' className='h-full w-full cursor-pointer object-scale-down' />
      )}
    </div>
  )
}

export default VideoOrImage
