import { useEffect } from "react"
import { useNFTBalances } from "react-moralis"
import NFTList from "../../components/NFTList"
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
        <NFTList list={data?.result} />
      )}
    </div>
  )
}

export default Nfts
