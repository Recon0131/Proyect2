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
        isAuthenticated===true ? <div className=' bg-greenGray p-8 rounded-xl'>
        <div className=' grid grid-cols-2 gap-5 rounded-xl'>
          <image src={user.photo.secure_url} width="150" alt={1} height="150" className=' rounded-3xl m-auto'/>
          
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
        </div> : <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-800 fill-zinc-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
      }
      
    </div>
  )
}

export default MyProfile
