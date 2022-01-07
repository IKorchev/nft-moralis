import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useChain } from "react-moralis"
import Tooltip from "../../components/Tooltip"
import { useNFTBalances } from "react-moralis"
import Jazzicon from "../../components/Jazzicon"
import PaginatedItems from "../../components/PaginatedItems"

function UserAddress() {
  const { chainId, account } = useChain()
  const { query } = useRouter()
  const [nfts, setNfts] = useState()
  const { getNFTBalances } = useNFTBalances()

  useEffect(() => {
    getNFTBalances({
      params: { chain: chainId, address: query.userAddress },
      onSuccess: (data) => {
        setNfts(data.result)
        console.log(data)
      },
      onError: (err) => console.log("33 [userAddress]" + err.message),
    })
  }, [chainId, query])
  const [tooltipShown, setTooltipShown] = useState(false)
  const toggleTooltip = () => {
    setTooltipShown(!tooltipShown)
  }
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col items-center mt-12'>
        <div className='border-4 rounded-full overflow-hidden border-white'>
          <Jazzicon address={query.userAddress} size={150} />
        </div>
        <h2
          onMouseEnter={toggleTooltip}
          onMouseLeave={toggleTooltip}
          className='text-xl cursor-pointer text-center -mt-4 bg-white rounded-full p-2 text-black'>
          <span className='relative flex items-center justify-center'>
            {shortenIfAddress(query.userAddress)}
            <Tooltip text={query.userAddress} shown={tooltipShown} className='mt-1' />
          </span>
        </h2>
      </div>
      <PaginatedItems items={nfts} itemsPerPage={15} />
    </div>
  )
}
export default UserAddress
