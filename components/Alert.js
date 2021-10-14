const Alert = ({ isAlertShown }) => {
  return (
    <div
      className={`fixed  transform transition ease-in-out duration-500 ${
        isAlertShown ? "translate-x-72" : "-translate-x-60"
      } top-24 -left-60 rounded-md px-5 py-3 bg-red-200 border border-red-600`}>
      <h1 className='text-red-600 text-lg font-semibold z-50'>Something went wrong...</h1>
    </div>
  )
}

export default Alert
