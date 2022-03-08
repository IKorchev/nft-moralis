import React from "react"

const VideoOrImage = ({ format, url }) => {
  return (
    <div>
      {format === "video" ? (
        <video
          autoPlay
          muted
          controls
          src={url || null}
          alt=''
          className='h-48 cursor-pointer rounded-lg object-scale-down '
        />
      ) : (
        <img src={url || null} alt='' className='h-48 cursor-pointer object-scale-down' />
      )}
    </div>
  )
}

export default VideoOrImage
