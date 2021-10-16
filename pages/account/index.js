import { shortenAddress } from "@usedapp/core"
import { useEffect, useState } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import SkeletonDashboard from "../../components/SkeletonDashboard"

const Account = () => {
  const { Moralis, user, isInitialized } = useMoralis()
  const [tokens, setTokens] = useState([])
  const [chain, setChain] = useState("bsc")
  useEffect(async () => {
    if (!user) return
    const balances = await Moralis.Web3API.account.getTokenBalances({
      address: user.attributes.ethAddress,
      chain: chain,
    })
    setTokens(balances)
  }, [user])

  return (
    <div className='h-screen'>
      {!tokens.length && <SkeletonDashboard />}
      {tokens.length && (
        <div className='lg:w-1/2 mx-auto mt-24 bg-primary-lightest backdrop-filter backdrop-blur-md bg-opacity-5 rounded-lg p-5 shadow-4xl'>
          <h1 className='font-semibold text-2xl text-light flex items-center justify-between'>
            <span>Dashboard</span>
            <span>
              Chain: <span className=' uppercase'>{chain}</span>
            </span>
            <span className='text-sm'>
              Account: {user && shortenAddress(user?.attributes.ethAddress)}
            </span>
          </h1>
          <div className='rounded-lg mt-12 overflow-hidden border border-primary shadow-lg'>
            <table className='text-white text-left mx-auto  w-full rounded-t-lg'>
              <thead className='bg-primary-lightest bg-opacity-50'>
                <th>Name</th>
                <th>Symbol</th>
                <th>Token Address</th>
                <th>Balance</th>
              </thead>
              {tokens.map((el) => {
                const { balance, symbol, name, decimals, token_address } = el
                const fixedBalance = (balance / 10 ** decimals).toFixed(2)
                return (
                  <tbody className='even:bg-primary-dark even:bg-opacity-60'>
                    <tr key={symbol}>
                      <td>{name}</td>
                      <td>{symbol}</td>
                      <td>{shortenAddress(token_address)}</td>
                      <td>
                        {fixedBalance} {symbol}
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
