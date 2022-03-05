import React from "react"
import { useMoralis } from "react-moralis"

const DisconnectButton = ({ className, label = "Disconnect" }) => {
  const { deactivateWeb3 } = useMoralis()
  return (
    <button
      className={`inline rounded-full  bg-rose-600 px-3 py-2 text-lg text-white ${className}`}
      onClick={deactivateWeb3}>
      {label}
    </button>
  )
}

export default DisconnectButton
