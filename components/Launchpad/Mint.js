import { useMoralis, useChain } from "react-moralis"
import ConnectWalletButton from "../Buttons/ConnectWalletButton"
import SwitchNetworkButton from "../Buttons/SwitchNetworkButton"
import MintButton from "../Buttons/MintButton"

const Mint = ({ mintedAmount, maxSupply, contractAddress, cost }) => {
  const { isWeb3Enabled } = useMoralis()
  const { chain } = useChain()
  return (
    <>
      {
        //prettier-ignore
        !isWeb3Enabled        ? <ConnectWalletButton  className='my-5'/>
        : chain.chainId !== '0x3' ? <SwitchNetworkButton network='0x3' className='my-5'/>
        :  (
        <>
           <MintButton contractAddress={contractAddress} cost={cost}  />
            <div className='mt-12 w-full flex flex-col  bg-secondary-dark/20 p-4 rounded-lg shadow-glass-secondary'>
                <p className='text-center'>Minted</p>
                <div className='relative my-3 flex h-4 w-full overflow-hidden rounded-full bg-primary-700'>
                <div
                    className='absolute top-0 left-0 grid h-4 place-items-center rounded-full bg-secondary-light '
                    style={{ width: `${(mintedAmount / maxSupply) * 100}%` }}></div>
                <span className='w-full text-center text-[12px]'>
                    {mintedAmount}/{maxSupply}
                </span>
                </div>
                <p className='mt-3 text-center text-white'>({((mintedAmount / maxSupply) * 100).toFixed(2)}%)</p>
            </div>
        </>
      )
      }
    </>
  )
}

export default Mint
