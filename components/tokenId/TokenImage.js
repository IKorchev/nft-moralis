const TokenImage = ({ format, url }) => {
  return (
    <div>
      {format === "video" ? (
        <div className='relative grid h-full w-full place-items-center '>
          <div className='bg-secondary-100 absolute top-3 left-3 z-10 h-full w-full rounded-lg' />
          <div className='z-20 h-full w-full overflow-hidden rounded-lg object-contain'>
            <video autoPlay controls muted src={url} className='rounded-lg object-contain' />
          </div>
        </div>
      ) : (
        <div className='relative grid h-full  w-full place-items-center'>
          <div className='bg-secondary-100 absolute top-3 left-3 z-10 h-full w-full rounded-lg' />
          <div className='z-10 h-full w-full overflow-hidden rounded-lg'>
            <img alt='Token' src={url} className='object-scale-down' />
          </div>
        </div>
      )}
    </div>
  )
}

export default TokenImage
