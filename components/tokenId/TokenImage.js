const TokenImage = ({ format, url }) => {
  return (
    <>
      {format === "video" ? (
        <div className='grid place-items-center max-w-full'>
          <video
            autoPlay
            controls
            muted
            src={url}
            className='object-contain rounded-lg'
          />
        </div>
      ) : (
        <div className='grid place-items-center bg-white w-full'>
          <img src={url} className='object-contain max-h-[35rem] w-full rounded-lg' />
        </div>
      )}
    </>
  )
}

export default TokenImage
