import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import customStyles from "../../utils/react-select-styles"
import Select from "react-select"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"
import PlusIcon from "@heroicons/react/outline/PlusIcon"
import MinusIcon from "@heroicons/react/outline/MinusIcon"
import { motion } from "framer-motion"

const Swap = () => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const { Moralis, user } = useMoralis()
  const [fromToken, setFromToken] = useState("")
  const [toToken, setToToken] = useState("")
  const [gasPrice, setGasPrice] = useState("")
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [slippage, setSlippage] = useState(1)

  useEffect(() => {
    getSupportedTokens()
  })

  const executeSwap = async () => {
    const userAddress = user.attributes.ethAddress
    const result = await Moralis.Plugins.oneInch.swap({
      chain: "bsc",
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount: fromAmount,
      fromAddress: userAddress,
      slippage: 1,
    })
    result.statusCode !== 200 && showAlert()
  }

  const getQuote = async () => {
    const result = await Moralis.Plugins.oneInch.quote({
      chain: "bsc",
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount: fromAmount,
    })
    //prettier-ignore
    result.statusCode !== 200 && setToAmount("Quote unavailable")
    setToAmount(result.toTokenAmount)
    setGasPrice(result.estimatedGas)
  }

  const getSupportedTokens = async () => {
    try {
      const result = await Moralis.Plugins.oneInch.getSupportedTokens({ chain: "bsc" })
      const tokens = result.tokens
      const arr = []
      for (const address in tokens) {
        const token = tokens[address]
        const _token = {
          value: token.address,
          label: token.symbol,
        }
        arr.push(_token)
      }
      setOptions(arr)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='py-36'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className='bg-primary-dark rounded-lg w-96 mx-auto text-primary-lightest flex flex-col shadow-4xl p-8  backdrop-filter bg-opacity-10 backdrop-blur-md'>
        <h2 className='-mt-2 mb-5 text-primary-lightest'>Swap token</h2>
        <div className='flex focus-within:ring ring-purple-600 rounded-lg border border-pinkish'>
          <input
            type='number'
            className='bg-transparent text-white w-full rounded-l-lg pl-3 text-lg'
            placeholder='amount'
            onChange={(e) => {
              setFromAmount(e.target.value)
            }}
            onBlur={async (e) => {
              e.preventDefault()
              if (fromAmount <= 0) return
              await getQuote()
            }}
          />
          <Select
            options={options}
            styles={customStyles}
            placeholder='FROM'
            onBlur={async (e) => {
              e.preventDefault()
              if (fromAmount <= 0) return
              await getQuote()
            }}
            onChange={(e) => {
              setFromToken(e.value)
            }}
          />
        </div>
        <button
          className='w-10 h-10 mx-auto mt-5 bg-primary rounded-full focus:ring-1'
          onClick={(e) => {
            e.preventDefault()
          }}>
          <RefreshIcon className='h-6 w-6 mx-auto text-pinkish' />
        </button>
        <div className='flex focus-within:ring ring-purple-600 rounded-lg border border-pinkish mt-5'>
          <input
            value={toAmount}
            disabled
            type='text'
            className='bg-transparent text-white w-full focus:ring-0 rounded-l-lg pl-3 text-lg'
            placeholder='amount'
          />
          <Select
            options={options}
            styles={customStyles}
            placeholder='TO'
            onBlur={async (e) => {
              e.preventDefault()
              if (fromAmount <= 0) return
              await getQuote()
            }}
            onChange={(e) => {
              setToToken(e.value)
            }}
          />
        </div>
        <p className='text-white ml-auto mt-5'>
          Slippage:
          <button onClick={() => setSlippage((old) => old + 1)}>
            <PlusIcon className='h-3 w-4' />
          </button>
          {slippage}
          <button onClick={() => setSlippage((old) => (old > 1 ? old - 1 : old))}>
            <MinusIcon className='h-3 w-4 text-white' />
          </button>
        </p>
        <p className='mt-5'>
          <span>Gas price: {Moralis.Units.FromWei(gasPrice, fromToken.decimals)}</span>
        </p>
        <button
          type='submit'
          disabled={loading}
          className=' bg-primary-lightest text-white font-bold border border-pinkish rounded-lg p-2 mt-2 transition shadow-3xl hover:bg-primary focus:border-red-400'
          onClick={async (e) => {
            e.preventDefault()
            executeSwap()
          }}>
          Swap
        </button>

        <p className='opacity-50 mt-2 text-center'>Quotes are based on 1Inch exchange</p>
      </form>
    </motion.div>
  )
}

export default Swap
