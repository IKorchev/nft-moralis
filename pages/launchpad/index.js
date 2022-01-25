const Launchpad = () => {
  const totalAmount = 10000
  const mintedAmount = 1000
  const percentage = (mintedAmount / totalAmount) * 100

  return (
    <div className='container flex   lg:px-36 py-12 mx-auto '>
      <div className='flex flex-col items-center lg:justify-between lg:flex-row gap-5 min-h-24 text-white lg:px-12 w-full mt-12 border border-pinkish p-12'>
        <div className='flex-1  lg:block justify-center'>
          <h1 className='inline text-xl  bg-purple-400 text-center p-2 uppercase rounded-md'>
            Featured launch
          </h1>
          <h2 className='text-4xl text-white mt-12'>Collection Name</h2>
          <p className='text-xs mt-5 max-w-[80%]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corporis
            velit vero, reprehenderit hic architecto autem voluptate et sunt perspiciatis.
          </p>
          <button className='bg-pinkish py-2 px-3 text-lg mt-5'>Mint now</button>
          <div className='mt-4'>
            <p>Minted</p>
            <div className='w-48 h-5 bg-purple-700 rounded-full overflow-hidden'>
              <div className={`bg-pinkish w-[${"13"}%] h-full `} />
            </div>
          </div>
        </div>
        <div className='flex-1 w-full '>
          <img
            className='object-contain  shadow-lg shadow-pinkish/30'
            src='https://lh3.googleusercontent.com/r-PVQ7JOzQDYECaSoy-lnlxajMdPbvj4z9FZbcJOay6WQUXJudY5kOKH8cTL2FUr4l5Hv-LzIzKti1YPi8CNZm_PTl09tn1GDzRJjQ=s550'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}

export default Launchpad
