import { Button, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return(
    <>
      <div className="bg-white w-full h-full py-24 px-6 md:px-32 flex flex-wrap">
        <div className="w-full md:w-[50%] flex flex-col justify-center">
          <h1 className="text-5xl font-bold font-poppins pb-3 pt-3">Simplify Your Budgeting Process</h1>
          <p className="text-sm font-normal text-slate-700 font-poppins pb-3 md:pr-10">SaldaQ helps you track every transaction and keeps your budget aligned with your goals.</p>
          <Button color="primary" className="w-[150px] shadow-xl py-2" radius="full" ><Link to={'/login'}>Get Started</Link></Button>
        </div>
        <div className="w-full md:w-[50%] relative pt-5">
        <div className="absolute lg:top-10 sm:top-[50px] md:top-6 md:left-8  sm:left-[-30px] lg:left-1 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg z-20 sm:w-[120px] md:w-[150px] lg:w-[230px]">
          <h3 className="text-md font-bold">Expense Tracking</h3>
          <p className="text-sm text-gray-700 hidden lg:block">
            Track your daily expenses with ease using our modern tools.
          </p>
        </div>
        <div className="absolute bottom-2 md:bottom-6 sm:bottom-[50px] right-[-10px] md:right-[-60px] sm:right-[-50px] bg-white/30 backdrop-blur-[50px] p-6 rounded-lg shadow-lg z-20 sm:w-[120px] md:w-[150px] lg:w-[230px]">
          <h3 className="text-md font-bold">Income Management</h3>
          <p className="text-sm text-gray-700 hidden lg:block">
            Manage your income streams effortlessly and keep track of your earnings.
          </p>
        </div>
          <div className="absolute lg:top-10 md:top-[10px] sm:top-[30px] sm:right-[20px] md:right-[-40px] lg:right-[50px] w-[300px] h-[300px] md:w-[350px] md:h-[350px] sm:w-[450px] sm:h-[450px] bg-blue-300 rounded-full z-0"></div>
          <Image src={'/3d.png'} alt="Hero Image" className="w-full relative z-10 lg:-top-8 md:right-[-20px]" />
        </div>
      </div>
    </>
  )
}

export default HeroSection