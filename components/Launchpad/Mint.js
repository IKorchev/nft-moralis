import { useMoralis, useChain } from "react-moralis"
import ConnectWalletButton from "../Buttons/ConnectWalletButton"
import SwitchNetworkButton from "../Buttons/SwitchNetworkButton"
import MintButton from "../Buttons/MintButton"
import useSWR from "swr"
import { getFetcher } from "../../utils/fetcher"
import Loading from "../Other/Loading"
import { BeatLoader } from "react-spinners"
const Mint = ({ contractAddress }) => {
  const { account } = useMoralis()
  const { chain } = useChain()
  const { data, error, isValidating } = useSWR(
    contractAddress ? `/api/nft/data?contract=${contractAddress}` : null,
    getFetcher
  )

  if (!data) {
    return (
      <div className='flex h-24 w-full items-center justify-center'>
        <BeatLoader color='white' speedMultiplier={0.5} size={10} />
      </div>
    )
  }

  return (
    <>
      {
        //prettier-ignore
        !account ? <ConnectWalletButton  className='my-5'/>
        : chain.chainId !== '0x3' ? <SwitchNetworkButton network='0x3' className='my-5'/>
        :  (
        <>
           <MintButton contractAddress={contractAddress} cost={data?.cost}  />
            <div className='mt-12 w-full flex flex-col border  bg-secondary-900 border-secondary-600 p-4 rounded-lg shadow-glass-secondary backdrop-filter backdrop-blur-sm'>
                <p className='text-center'>Minted</p>
                <div className='relative my-3 flex h-4 w-full overflow-hidden rounded-full bg-secondary-700'>
                <div
                    className='absolute top-0 left-0 grid h-4 place-items-center rounded-full bg-secondary-200 '
                    style={{ width: `${(data?.supply / data?.maxSupply) * 100}%` }}></div>
                <span className='w-full text-center text-[12px]'>
                    {data?.supply} / {data?.maxSupply} 
                </span>
                </div>
                <p className='mt-3 text-center text-white'>({((data?.supply / data?.maxSupply) * 100).toFixed(2)}%)</p>
            </div>
        </>
      )
      }
    </>
  )
}

export default Mint
