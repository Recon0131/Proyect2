import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'



function LoginPage() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  
  const {signin,isAuthenticated,errors: SigninError } = useAuth();
  const navigate = useNavigate()
console.log(SigninError)

  useEffect(()=>{
    function refreshPage() {
      window.location.reload(false);
    }
    if(isAuthenticated){
      navigate("/")
      refreshPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])
  
  
  return (
    <div className=" bg-zinc-800 max-w-md p-10 rounded-md m-auto mt-60 text-zinc-300 movil:mx-4">
      {
        SigninError.map((error,i)=>(
          <div className=" bg-red-600 p-2 my-2"key={i}>
            {error}
          </div>
        ))
      }
      <h1 className=" font-bold text-2xl my-4">Login</h1>
      <form
        onSubmit={handleSubmit(async (values) => {
          await signin(values)
          
        })}
      >
        
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          />
          {errors.email && (<p className=" text-red-600 w-full">Email is required</p>)}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className=" w-full px-4 py-2 rounded-md bg-zinc-700 my-2"
          />
          {errors.password && (<p className=" text-red-600 w-full">Password is required</p>)}
        
          
        <button type="submit" className=" border-solid border-2 bg-zinc-700 border-zinc-700 px-4 py-2 my-3 rounded-xl">
          Login
        </button>
        <p>You don't have a acount? <a href="/register" className=" text-blue-500"> Sign up</a> </p>
      </form>
    </div>
  );
}

export default LoginPage;
