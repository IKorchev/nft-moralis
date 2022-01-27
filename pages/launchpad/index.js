import { useMoralis } from "react-moralis"
import Link from "next/link"
import Card from "../../components/Launchpad/Card"
import useMarketInteractions from "../../hooks/useMarketInteraction"

const Launchpad = () => {
  const { mintToken, getMintCost } = useMarketInteractions()
  const totalAmount = 10000
  const mintedAmount = 555
  const difference = totalAmount - mintedAmount
  const percentage = (mintedAmount / totalAmount) * 100
  // const collectionAddress = "0x03ad64bf71db467cc96b3ef88967ee966ba54efd"
  const collectionAddress = "0x270cc76efcaed26308cf1919f0148e716b1cca83"
  const { Moralis } = useMoralis()
  return (
    <div className='container mx-auto px-5 sm:px-24 lg:px-48'>
      <div className='flex flex-col lg:justify-between border border-pink-900 bg-primary-800/10 rounded-md p-8 lg:p-12 xl:flex-row gap-5 min-h-24 text-white w-full mt-12'>
        <div className='flex-1 '>
          <h1 className='inline text-xl my-2 bg-pink-400 text-center px-4 py-2 uppercase rounded-full '>
            Featured launch
          </h1>
          <h2 className='text-4xl text-white mt-16'>Collection Name</h2>
          <p className='text-sm mt-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corporis
            velit vero, reprehenderit
          </p>
          <div>
            <button
              onClick={async () => {
                const cost = await getMintCost(collectionAddress)
                mintToken(collectionAddress, cost, 1)
              }}
              className='bg-secondary  py-1 px-3 text-lg mt-12 rounded-full hover:bg-secondary-dark transition duration-500'>
              Mint now
            </button>
            <Link href={`/assets/${collectionAddress}`}>
              <a className='bg-light text-secondary ml-3 py-1 px-3 text-lg mt-12 rounded-full focus:ring-2 focus:ring-secondary'>
                Learn more
              </a>
            </Link>
          </div>
          <div className='mt-12 w-full xl:pr-16'>
            <p className='text-center'>Minted</p>
            <div className='w-full flex h-5 bg-primary-700 my-3 rounded-full relative overflow-hidden'>
              <div
                className='bg-secondary/90 rounded-full  h-5 grid place-items-center absolute top-0 left-0 '
                style={{ width: `${percentage}%` }}></div>
              <span className='text-[12px] text-center w-full'>
                {mintedAmount}/{totalAmount}
              </span>
            </div>
            <p className='text-center text-white mt-3'>({percentage}%)</p>
          </div>
        </div>
        <div className='flex-1 w-full h-full relative'>
          <Link href={`/assets/${collectionAddress}`}>
            <img
              className='object-contain w-full cursor-pointer shadow-lg shadow-secondary/30'
              src='https://lh3.googleusercontent.com/r-PVQ7JOzQDYECaSoy-lnlxajMdPbvj4z9FZbcJOay6WQUXJudY5kOKH8cTL2FUr4l5Hv-LzIzKti1YPi8CNZm_PTl09tn1GDzRJjQ=s550'
              alt=''
            />
          </Link>
        </div>
      </div>
      <div className='container py-5 mx-auto mt-12'>
        <h1 className='text-3xl text-white border-b border-secondary py-3'>Upcoming</h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 scrollbar-thumb-primary-600'>
          {[0, 1, 2, 3, 1, 3, 4, 5, 6, 7].map((el) => (
            <Card
              collectionAddress={collectionAddress}
              imageUrl='https://ipfs.pixura.io/ipfs/QmNgZHwD8HzUpZFqgigvurzREoqUrpVfGsFwkXxUfCnFjg'
            />
          ))}
        </div>
      </div>
      <div className='container py-12 mx-auto'>
        <h1 className='text-3xl text-white border-b border-secondary py-3'>Completed</h1>
        <div className='flex mt-5 px-2 gap-5 w-full overflow-auto styled-scrollbar py-4 scrollbar-thumb-primary-600'>
          {[0, 1, 2, 3, 1, 3, 4, 5, 6, 7].map((el) => (
            <Card
              collectionAddress={collectionAddress}
              imageUrl='https://ipfs.pixura.io/ipfs/QmNgZHwD8HzUpZFqgigvurzREoqUrpVfGsFwkXxUfCnFjg'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Launchpad
