const VideoOrImage = ({ format, url, setLoading }) => {
  return (
    <div className='h-48 w-full lg:h-60 '>
      {format === "video" ? (
        <video
          onLoad={() => setLoading && setLoading("loaded")}
          onError={() => setLoading && setLoading("error")}
          autoPlay
          muted
          controls
          src={url || null}
          alt='NFT'
        />
      ) : (
        <img
          onLoad={() => setLoading && setLoading("loaded")}
          onError={() => setLoading && setLoading("error")}
          src={url || null}
          alt='NFT'
        />
      )}
    </div>
  )
}

export default VideoOrImage
