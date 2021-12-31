
import NFTCard from "./NFTCard"

const NFTList = ({ list }) => {

  return (
    <div className='container px-24 mx-auto flex flex-wrap justify-evenly mt-12'>
      {list?.map((el) => {
        return <NFTCard data={el} metadata={el.metadata} />
      })}
    </div>
  )
}

export default NFTList
