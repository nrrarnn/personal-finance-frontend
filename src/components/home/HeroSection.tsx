import { Button, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return(
    <>
      <section className="bg-white w-full h-full py-24 px-6 md:px-32 flex flex-wrap">
        <div className="w-full md:w-[50%] flex flex-col justify-center">
          <h1 className="text-5xl font-bold font-poppins pb-3 pt-3">Simplify Your Budgeting Process</h1>
          <p className="text-sm font-normal text-slate-700 font-poppins pb-3 md:pr-10">SaldaQ helps you track every transaction and keeps your budget aligned with your goals.</p>
          <Button color="primary" className="w-[150px] shadow-xl py-2" radius="full" ><Link to={'/login'}>Get Started</Link></Button>
        </div>
        <div className="w-full md:w-[50%] relative pt-5">
        <div className="absolute top-[50px] md:left-[-30px] bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg z-20 w-[120px] md:w-[230px]">
          <h3 className="text-md font-bold">Expense Tracking</h3>
          <p className="text-sm text-gray-700 md:block hidden">
            Track your daily expenses with ease using our modern tools.
          </p>
        </div>
        <div className="absolute bottom-2 md:bottom-[50px] right-[-10px] md:right-[-50px] bg-white/30 backdrop-blur-[50px] p-6 rounded-lg shadow-lg z-20 w-[130px] md:w-[230px]">
          <h3 className="text-md font-bold">Income Management</h3>
          <p className="text-sm text-gray-700 md:block hidden">
            Manage your income streams effortlessly and keep track of your earnings.
          </p>
        </div>
          <div className="absolute md:top-[10px] top-[30px] right-[20px] md:right-[50px] w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-blue-300 rounded-full z-0"></div>
          <Image src={'/3d.png'} alt="Hero Image" className="w-full relative z-10" />
        </div>
      </section>
    </>
  )
}

export default HeroSection