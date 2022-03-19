const SectionContainer = ({ children, ...props }) => {
  return (
    <div className='flex min-h-[45rem] justify-center gap-2 lg:justify-start' {...props}>
      {children}
    </div>
  )
}

export default SectionContainer
