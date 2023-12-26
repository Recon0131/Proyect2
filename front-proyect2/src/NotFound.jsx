import React from 'react'
import { GoAlertFill } from "react-icons/go";


function NotFound() {
  return (
    <div className=' text-4xl flex justify-center text-zinc-400 my-96'>
        
        <GoAlertFill/>
        <h1>Page Not Found</h1>
        
    </div>
  )
}

export default NotFound