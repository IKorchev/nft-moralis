import Link from "next/link"

const NFTCard = ({ img, name, description, token_uri, token_address, token_id }) => {
  return (
    <div
      className='flex flex-col items-center rounded-lg p-2  w-60 overflow-hidden 
    shadow-lg bg-white mt-2  translate duration-300 transform hover:shadow-3xl hover:scale-102'>
      <Link href={`/nft/${token_address}?id=${token_id}`} passHref>
        <img
          src={
            img ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDq7-cziw6BRNcnmaDB_fBOrnL8WN6Zp4HFLSC3PlWl9zap0X95n0kS5q__yA5tF15as&usqp=CAU"
          }
          alt=''
          className='h-48 cursor-pointer'
        />
      </Link>
      <div className='flex flex-col text-left w-full'>
        <h1 className='text-lg font-bold truncate'>{name || "Title"}</h1>
        <p className='w-full max-h-24'>{description}</p>
        <div>
          <a
            href={token_uri}
            target='_blank'
            rel='noreferrer'
            className='font-semibold truncate'>
            <small> Token URI </small>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
