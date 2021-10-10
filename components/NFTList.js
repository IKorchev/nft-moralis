import { useEffect } from "react"
import NFTCard from "./NFTCard"

const NFTList = ({ list }) => {
  return (
    <div className='container px-24 mx-auto flex flex-wrap justify-evenly mt-12'>
      {list && list.result.length > 0 ? (
        list.result.map((el) => {
          const metadata = JSON.parse(el.metadata)
          return <NFTCard metadata={el} key={metadata.token_uri} />
        })
      ) : (
        <div className='flex h-screen'>
          <h1 className='text-2xl text-light text-center'>
            Couldn't find any NFT's. Try using a different keyword or try again later.
          </h1>
        </div>
      )}
    </div>
  )
}

export default NFTList
