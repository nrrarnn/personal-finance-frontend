import { Button, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import api from "../../api/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { setAuth } from "../../store/authSlice"

interface AuthResponse {
  token: string;
  user: {
    username: string;
    email: string;
  };
}

const loginSchema = z.object({
  email: z.string().email("Format email harus sesuai"),
  password: z.string().min(8, "Password minimal 8 karakter"),
})
const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: { email: string, password: string }) => {
    try {
      const response = await api.post<AuthResponse>('/login', {
        email: data.email,
        password: data.password
      })
      const token: string = response.data.token
      const username: string = response.data.user.username
      const email: string = response.data.user.email

      dispatch(setAuth({ token, username, email }));

      console.log("Login successfully")
      navigate('/dashboard/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row justify-center items-center ">
      <div className="w-full sm:w-[48%] px-32 flex flex-col justify-center text-center items-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col p-3 w-[300px] gap-3">
        <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
                />
              )}
            />
        <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
            <Input
              {...field}
              type="password"
              label="Password"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
                />
              )}
            />
        <Button type="submit" className="bg-indigo-500 text-white">Login</Button>
      </form>
      <div>Belum punya akun? <Link to="/register" className="text-blue-500">Register</Link></div>
      </div>
      <div className="w-[48%] h-full hidden sm:flex bg-indigo-500 justify-center">
        <img src="fp.png" alt="register" className="w-[500px] bg-cover" />
      </div>
    </div>
  )
}

export default LoginPage