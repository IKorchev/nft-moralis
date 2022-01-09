import Illustration from "../assets/Illustration"
import LandingPage from "../components/LandingPage"
import LandingPage2 from "../components/LandingPage2"
const Home = () => {

  return (
    <div className='landing-page relative '>
      <div className='absolute top-0 right-24 z-0 '>
        <Illustration className='opacity-10 lg:opacity-100 h-[700px] w-full lg:h-full' />
      </div>
      <LandingPage />
      <LandingPage2 />
    </div>
  )
}

export default Home
