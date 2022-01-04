import { useEffect } from "react"
import { useNFTBalances } from "react-moralis"
import NFTItem from "../../components/NFTItem"
import { formatIpfs } from "../../utils/common"

const Nfts = () => {
  const { getNFTBalances, data, error } = useNFTBalances()

  useEffect(() => {
    getNFTBalances()
  }, [])

  return (
    <div>
      {data?.result?.length === 0 ? (
        <h2 className='text-center text-white'>You have no NFTs in your account</h2>
      ) : (
        <div className='container px-24 grid grid-cols-4 mx-auto'>
          {data?.result?.map((el) => {
            return (
              <NFTItem
                tokenUri={el.token_uri}
                metadata={el.metadata}
                tokenId={el.token_id}
                tokenAddress={el.token_address}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Nfts
