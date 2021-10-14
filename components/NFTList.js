import NFTCard from "./NFTCard"

const NFTList = ({ list }) => {
  return (
    <div className='container px-24 mx-auto flex flex-wrap justify-evenly mt-12'>
      {list?.map((el) => {
        const metadata = JSON.parse(el.metadata)
        return <NFTCard metadata={el} key={metadata.token_uri} />
      })}
    </div>
  )
}

export default NFTList
