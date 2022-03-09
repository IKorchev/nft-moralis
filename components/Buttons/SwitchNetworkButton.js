import React from "react"
import { useChain } from "react-moralis"
const SwitchNetworkButton = ({
  network,
  className,
  rounded = "full",
  label = "Switch network",
}) => {
  const { switchNetwork } = useChain()

  return (
    <button
      className={`w-max bg-primary-100 px-3 py-2 text-lg font-semibold text-black transition duration-150 active:scale-90 rounded-${rounded} ${className}`}
      onClick={() => switchNetwork(network)}>
      {label}
    </button>
  )
}

export default SwitchNetworkButton
