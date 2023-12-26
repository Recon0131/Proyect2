import React, { useState,useEffect} from 'react'
import { useAuth } from "../context/AuthContext.jsx";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";
import {ViewCv} from '../components/ViewCv.jsx'
import { FaBriefcase } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'

function MyProfile() {
  const { user,isAuthenticated } = useAuth();  
  const [view, setView] = useState(null);
  const navigate= useNavigate();
  
  useEffect(()=>{
    
    if(!isAuthenticated){
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])
 

  return (
    <div className=' flex m-auto justify-center my-10 text-zinc-300 mx-2'>
      {
      <div className=' bg-greenGray p-8 rounded-xl'>
        <div className=' grid grid-cols-2 gap-5 rounded-xl'>
          <img src={user.photo.secure_url} width="150" alt={1} height="150" className=' rounded-3xl m-auto'/>
          
          <div>
          <p className='font-bold'>{user.username}</p>
          <p>{user.description}</p>
          <button
                onClick={() => setView(user.cv)}
                className=" bg-red-700 text-zinc-200 p-2 rounded-xl hover:bg-red-800 font-bold my-4 flex"
              >
                <FaBriefcase className=" my-auto mx-1" />
                View my cv
              </button>
          </div>
          <div className=' font-bold text-lg flex-col m-auto'>
            <section className=' flex gap-2'>
          <MdEmail className=' my-auto text-gray-500'/>
          <p>{user.email}</p>
          </section>

          <section className='flex gap-2'>
          <FaPhoneAlt className=' my-auto text-gray-500'/>
          <p>{user.phone}</p>
          </section>

          </div>
        </div>
          <ul className=' grid grid-cols-3 gap-5 mt-5 movil:grid-cols-2 movil:text-center movil:justify-normal'>
          {user.specialization.map((user,i) =><li key={i} className=' bg-zinc-700 m-auto p-2 text-zinc-300 font-bold rounded-2xl'>#{user}</li>)}
          </ul>
          {view ? (
            <div className=" absolute top-1/2 left-1/2 translate-x-porcent translate-y-porcent h-screen w-screen ">
              <div className=" absolute opacity-50 bg-black z-0 h-screen w-screen"/>
              <section className=" z-30 absolute top-1/2 left-1/2 translate-x-porcent translate-y-porcent h-screen w-screen">
              <AiOutlineCloseCircle className=" text-red-900 z-30 text-3xl absolute right-5 my-2 cursor-pointer" onClick={()=>setView(null)}/>
              <ViewCv view={view}/>
              </section>
            </div>
          ) : (
            ""
          )}
          <Link to="/update" className=' bg-blue-700 font-bold flex m-auto my-5 max-w-fit p-3 rounded-2xl hover:bg-blue-900'>Edit Profile</Link>
        </div>
      }
      
    </div>
  )
}

export default MyProfile
