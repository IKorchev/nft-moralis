const Card = ({ image, title, description, buttonText, className, animate = false }) => {
  return (
    <div
      className={`${className} card h-96 w-86 xl:w-96 text-center my-5 lg:my-0 text-black bg-white border-pinkish p-5 shadow-xl lg:-mt-10`}>
      <img src={image} alt='' className={`${animate && "animate-spin-slow"} mb-6 mt-2`} />
      <h2 className='text-center my-5 text-pink-400'>{title}</h2>
      <p>{description}</p>
      <a
        href='/explore'
        className='bg-pinkish px-8 text-white hover:bg-primary-lightest transition duration-500 border-pinkish border font-bold  py-1 rounded-full mt-8'>
        {buttonText}
      </a>
    </div>
  )
}

export default Card
