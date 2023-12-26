import React from 'react'
import { useForm } from "react-hook-form";
import {useAuth} from '../context/AuthContext';

function FeedBack({username}) {
    const { register, handleSubmit,formState:{errors},} = useForm();
    const {feedback,errors: FeedError } = useAuth();
    
      function refreshPage() {
        window.location.reload(false);
      }
      
    
  

  return (
    <div className=' bg-greenDark max-w-full max-h-fit p-10 my-10 movil:mx-3 text-zinc-400 rounded-xl '>
      {FeedError.map((error, i) => (
          <span key={i} className=" bg-red-600 font-bold p-3 text-center flex justify-center my-2">{error}</span>
        ))}
        <form onSubmit={handleSubmit(async(e)=>{
            e.username= username
            await feedback(e)

            refreshPage();
            
        })}>
        <h1 className=' font-bold '>Message</h1>
        <p>Name:</p>
        <input {...register("name", { required: true })} type="text" className=' bg-zinc-800 rounded-lg min-w-full p-1'></input>
        {errors.name && (<p className=" text-red-600 w-full">Name is required</p>)}
        <p>Email:</p>
        <input  {...register("email", { required: true })} type="email" className=' bg-zinc-800 rounded-lg min-w-full p-1'></input>
        {errors.email && (<p className=" text-red-600 w-full">Email is required</p>)}
        <p>Message:</p>
        <textarea {...register("message", { required: true })} type="text" className=' bg-zinc-800 rounded-lg min-w-full max-h-60 p-2'></textarea>
        {errors.message && (<p className=" text-red-600 w-full">Message is required</p>)}
        <button type="submit" className=' bg-zinc-700 px-4 py-2 flex rounded-xl m-auto mt-5'>Send</button>
        </form>
        
    </div>
  )
}

export default FeedBack