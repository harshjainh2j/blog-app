import React,{useState} from 'react'
import authService from '../appwrite/auth'
import{Button,Input} from './index'
import {useNavigate,Link} from 'react-router-dom'
import {Logo} from './index'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import { login  } from '../store/authSlice'
 
function SignupComponent() {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const signupUser = async(data) => {
      setError("")
      try {
          const userData = await authService.createAccount(data)
          if (userData) {
              const userData = await authService.getCurrentStatus()
              if(userData)  dispatch(login(userData));
              navigate("/")

          }
      } catch (error) {
          setError(error.message)
      }
  }
  return (
    <div className="items-center flex justify-center w-full">
    <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
      <div className="mb-2 flex justify-center ">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Signup to create your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Signin
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(signupUser)}>
        <div className="space-y-5">
        <Input
        type="text"
        label="FullName"
        placeholder="Enter your FullName"
        {...register("fullname", { required: true })}/>
          <Input
            type="email"
            label="Email"
            placeholder=" Enter your Email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) => {
                  return (
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || "Invalid email"
                  );
                },
              },
            })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your Password"
            {...register("password",{
              required: true,})}
          />
          <Button
            type="submit"
            className="w-full">Create Account</Button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default SignupComponent
