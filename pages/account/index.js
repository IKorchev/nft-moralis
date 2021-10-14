import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
const Account = () => {
  const { Moralis, user,  } = useMoralis()
  const [usersTokens, setUsersTokens] = useState()
  useEffect(() => {
      
  }, [])
  return (
    <div className='h-screen'>
      <div className='lg:w-1/2 mx-auto mt-12 bg-primary-lightest backdrop-filter backdrop-blur-md bg-opacity-5 rounded-lg h-1/2 p-5'>
        <h1 className='font-semibold text-3xl text-light flex items-center justify-between'>
          <span>Dashboard</span>
          <span className='text-sm'>Account: {user && user.attributes.ethAddress}</span>
        </h1>
      </div>
    </div>
  )
}

export default Account
