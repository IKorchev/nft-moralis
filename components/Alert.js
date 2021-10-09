import { useEffect, useState } from "react"
const Alert = ({ isAlertShown, setIsAlertShown }) => {
  useEffect(() => {
    setTimeout(() => setIsAlertShown(false), 3000)
    return () => clearTimeout()
  }, [])
  return (
    <div
      className={`fixed transform transition ease-in-out duration-500 ${
        isAlertShown ? "translate-x-72" : "-translate-x-60"
      } top-24 -left-60 rounded-md p-3 bg-light-grayish`}>
      <h1 className='text-red-400 text-lg font-semibold'>Something went wrong... </h1>
    </div>
  )
}

export default Alert
