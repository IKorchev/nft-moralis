import React from "react"
import { useChain } from "react-moralis"
const SwitchNetworkButton = ({
  network,
  className,
  rounded = "full",
  label = "Switch network",
  size = "lg",
}) => {
  const { switchNetwork } = useChain()
  const padding = {
    x: size === "lg" ? "3" : size === "xs" ? "2" : "2",
    y: size === "lg" ? "2" : size === "xs" ? "1" : "1",
  }
  return (
    <button
      className={`bg-primary-100 w-max px-${padding.x} py-${padding.y} text-${size} font-semibold text-white transition duration-150 active:scale-90 rounded-${rounded} ${className}`}
      onClick={() => switchNetwork(network)}>
      {label}
    </button>
  )
}

export default SwitchNetworkButton
