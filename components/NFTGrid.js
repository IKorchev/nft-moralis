import NFTItem from "./NFTItem"

const NFTGrid = ({ nfts }) => {
  return (
    <div className='flex flex-wrap gap-5 w-full mx-auto justify-center'>
      {nfts.map((el) => {
        return (
          <NFTItem
            key={el.token_uri}
            tokenUri={el.token_uri}
            metadata={el.metadata}
            tokenId={el.token_id}
            tokenAddress={el.token_address}
            contractName={el.name}
          />
        )
      })}
    </div>
  )
}

const Item = ({}) => {

}

export default NFTGrid
