import { Button, Input } from "@nextui-org/react"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <>
    <div className="w-full h-screen flex flex-col sm:flex-row justify-center items-center ">
      <div className="w-full sm:w-[48%] px-32 flex flex-col justify-center text-center items-center">
      <h1 className="text-3xl font-bold">Register</h1>
      <form action="" className="flex flex-col p-3 w-[300px] gap-3">
        <Input type="text" label="Username" />
        <Input type="email" label="Email" />
        <Input type="password" label="Password" />
        <Input type="password" label="Confirm Password" />
        <Button type="submit" className="bg-indigo-500 text-white">Register</Button>
      </form>
      <div>Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></div>
      </div>
      <div className="w-[48%] h-full hidden sm:flex bg-indigo-500 justify-center">
        <img src="fp.png" alt="register" className="w-[500px] bg-cover" />
      </div>
    </div>
    </>
  )
}

export default RegisterPage