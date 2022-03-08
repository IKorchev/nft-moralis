import { PuffLoader } from "react-spinners"

const Loading = ({
  containerProps = { className: "h-[70vh] grid place-items-center bg-blue" },
  loaderProps = { size: 200, color: "white" },
}) => {
  return (
    <div {...containerProps}>
      <PuffLoader size={loaderProps?.size || 80} {...loaderProps} />
    </div>
  )
}

export default Loading
