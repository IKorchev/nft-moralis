import { PuffLoader } from "react-spinners"

const Loading = ({ loaderProps, containerProps }) => {
  return (
    <div {...containerProps}>
      <PuffLoader size={loaderProps?.size || 80} {...loaderProps} />
    </div>
  )
}

export default Loading