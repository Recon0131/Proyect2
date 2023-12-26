import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'
import {useDropzone} from 'react-dropzone'
import { uploadCloud } from "../cloud/uploadCloud";


function UpdatePage() {
    const { register, handleSubmit,formState:{
        errors
      } } = useForm();
      const {user,update,errors: AuthErrors } = useAuth();
      const navigate = useNavigate()
      const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
      }, [])

      const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({onDrop})
      const [Photo,setPhoto] = useState(null)
      const [select,setSelect] = useState([])
      const PHOTODEFAULT = "https://res.cloudinary.com/dpuap0fag/image/upload/v1703116151/simple-user-default-icon-free-png_h7wqyg.png"

      

      const profilePhoto = ()=>{
        if(!Photo){
          return PHOTODEFAULT
        }
        else{
          return URL.createObjectURL(Photo)
    
        }
      }
      
      const handdleSelect = (op,check) => { 
    
        if(check){
          setSelect([...select,op])
          
        }
        else{
          setSelect(select.filter((e)=> e !== op))
        }
        
      }

  return (
    <div className=" bg-zinc-800 max-w-lg p-10 rounded-md m-auto mt-40 text-zinc-300">
      
    <h1 className=" font-bold text-2xl my-4"> Update Profile</h1>
    {AuthErrors.map((error, i) => (
        <span key={i}>{error}</span>
      ))}
    <form
      onSubmit={handleSubmit(async (values) => {
        values.id = user.id;
        
        const res= await uploadCloud(acceptedFiles[0]) 
        const data = await res.json()
        

        const photo = await uploadCloud(Photo)
        const dataPhoto = await photo.json()


        values.specialization = select

        values.cv={
          public_id: data.public_id,
          secure_url: data.secure_url,
        }


        values.photo = {
          public_id: dataPhoto.public_id,
          secure_url: dataPhoto.secure_url,
        }

        
        update(values);
        navigate("/")
      })}

    >

      <img className=" m-auto py-5" src={profilePhoto()} alt="Perfil" width="150" height="150" />
      <input type="file" {...register("photo", { required: true })}  onChange={(e)=>setPhoto(e.target.files[0])} accept="image/*"/>  

      {errors.photo && (<p className=" text-red-600 w-full">Your photo is required</p>)}

      <input
        type="text"
        {...register("username", { required: true })}
        className=" w-full px-4 py-2 rounded-md bg-zinc-700 my-2"
        placeholder="Username"
        />
        {errors.username && (<p className=" text-red-600 w-full">Username is required</p>)}
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

        <input 
          type="text"
          {...register("description",{required:true})}
          placeholder="Your description"
          className=" w-full px-4 py-2 rounded-md bg-zinc-700 my-2"
        />
        {errors.description && (<p className=" text-red-600 w-full">Description is required</p>)}
        <input 
          type="text"
          {...register("phone",{required:true})}
          placeholder="Enter your phone number"
          className=" w-full px-4 py-2 rounded-md bg-zinc-700 my-2"
        />
        {errors.phone && (<p className=" text-red-600 w-full">Your phone is required</p>)}
        <input 
          type="text"
          {...register("direction",{required:true})}
          placeholder="Direction "
          className=" w-full px-4 py-2 rounded-md bg-zinc-700 my-2"
        />
        {errors.direction  && (<p className=" text-red-600 w-full">Your direction is required</p>)}
        <div className=" my-2">
          <span className=" text-zinc-500">Select your specializations</span>
        </div>

        <div className=" grid grid-cols-2 ">

        <label className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} {...register("specializations", { required: true })} value="cardiologist"/>
          Cardiologist
        </label>
        <label className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} value="nephrologist" {...register("specializations", { required: true })}/>
          Nephrologist
          </label>
          <label  className=" bg-zinc-700 text-zinc-400  mx-2 my-1 p-2 rounded-md">
          <input className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} value="immunologist" {...register("specializations", { required: true })}/>
          Immunologist
          </label>

          <label className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} value="gastroenterologist" {...register("specializations", { required: true })}/>
          Gastroenterologist
          </label>

          <label  className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input className=" mx-1" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)}  value="infectious-disease" {...register("specializations", { required: true })}/>
          Infectious disease
          </label>

          <label className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} value="endocrinologist" {...register("specializations", { required: true })}/>
          Endocrinologist
          </label>

          <label  className=" bg-zinc-700 text-zinc-400 mx-2 my-1 p-2 rounded-md">
          <input  className=" mx-2" type="checkbox" onClick={(e)=>handdleSelect(e.target.value,e.target.checked)} value="ophthalmologist" {...register("specializations", { required: true })}/>
          Ophthalmologist
          </label>
        </div>
        {errors.specializations && (<p className=" text-red-600 w-full">Select at least one specialization</p>)}
        

        <div {...getRootProps()} className=" border-dashed border-2 p-5 my-3" {...register("image", { required: true })} >
    <input {...getInputProps()} accept=".pdf"/>
    {
      isDragActive ?
        <p>Drop your curriculum in .PDF here ...</p> :
        <p>Drag 'n' drop your curriculum here, or click to select files ONLY IN .PDF </p>
    }
  </div>
      {
        acceptedFiles[0] && <embed src={URL.createObjectURL(acceptedFiles[0])} alt="" className=" w-full "></embed>
      }
      {errors.image && (<p className=" text-red-600 w-full">Curriculum is required</p>)}

      
      <button type="submit" className=" border-solid border-2 bg-zinc-700 border-zinc-700 px-4 py-2 my-3 rounded-xl">
        Upload
      </button>
      
    </form>
  </div>
  )
}

export default UpdatePage