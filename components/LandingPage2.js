import Wave from "../assets/wave.svg"

const LandingPage2 = () => {
  return (
    <div className=''>
      <img src={Wave.src} className='-pt-24' />
      <div className='bg-light'>
        <h1 className='text-pinkish text-center text-5xl font-semibold'>
          Everything in one place
        </h1>
        <div className='container mx-auto flex justify-evenly mt-24'>
          <div className='card h-96 bg-white border-pinkish p-5 shadow-xl'>
            <h2 className='text-center'>Explore NFTs on multiple chains</h2>
          </div>
          <div className='card h-96 bg-white border-pinkish p-5 -mt-10 shadow-xl'>
            <h2 className='text-center'>Mint your own NFT</h2>
          </div>
          <div className='card h-96 bg-white border-pinkish p-5 shadow-xl'>
            <h2 className='text-center'>Swap/Exchange Tokens</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
