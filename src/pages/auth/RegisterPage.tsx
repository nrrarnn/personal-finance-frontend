import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod";
import api from "../../api/api";

const registerSchema = z.object({
  username: z.string().min(4, "Name minimal 4 karakter"),
  email: z.string().email("Format email belum sesuai"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});
const RegisterPage = () => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: { username: string, email: string, password: string, confirmPassword: string }) => {
  try {
    const { confirmPassword, ...userData } = data;
    
    const response = await api.post('/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password
    });

    console.log(response.data);
    console.log("Register successfully");

    navigate('/login');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
    <div className="w-full h-screen flex flex-col sm:flex-row justify-center items-center ">
      <div className="w-full sm:w-[48%] px-32 flex flex-col justify-center text-center items-center">
      <h1 className="text-3xl font-bold">Register</h1>
      <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col p-3 w-[300px] gap-3">
        <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              label="Username"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
                />
              )}
            />
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
        <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
            <Input
              {...field}
              type="password"
              label="Confirm Password"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
                />
              )}
            />
        
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