import React from 'react'
import { useParams } from 'react-router-dom'
import CardProfile from '../components/CardProfile'
import FeedBack from '../components/FeedBack'
import Comments from '../components/Comments'

function DoctorProfile() {
    const {username}=useParams()
    
  return (
    <div className=' grid justify-center'>
    <CardProfile username={username}/>
    <Comments username= {username}/>
    <FeedBack username={username}/>
    </div>
  )
}

export default DoctorProfile