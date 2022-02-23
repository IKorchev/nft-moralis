const TokenImage = ({ format, url }) => {
  return (
    <>
      {format === "video" ? (
        <div className='grid max-w-full place-items-center'>
          <video autoPlay controls muted src={url} className='rounded-lg object-contain' />
        </div>
      ) : (
        <div className='grid w-full place-items-center bg-white'>
          <img src={url} className='max-h-[35rem] w-full rounded-lg object-contain' />
        </div>
      )}
    </>
  )
}

export default TokenImage
