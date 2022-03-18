import React from "react"
import { useMoralis } from "react-moralis"

const DisconnectButton = ({ className, rounded = "sm", label = "Disconnect" }) => {
  const { deactivateWeb3 } = useMoralis()
  return (
    <button
      className={`inline w-max rounded-${rounded} border border-rose-500  bg-rose-500 px-3 py-1 text-lg text-black
       transition duration-150 focus:bg-rose-400 active:scale-95 hover:bg-rose-400 ${className}`}
      onClick={deactivateWeb3}>
      {label}
    </button>
  )
}

export default DisconnectButton
