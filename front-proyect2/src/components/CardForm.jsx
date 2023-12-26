import React from 'react'
import { LinkSkill } from "../components/LinkSkill";
import {useNavigate} from 'react-router-dom'


function CardForm({i,doctor}) {
    const navigate = useNavigate();

    
  return (
    <div key={i} className=" m-auto text-center bg-greenGray p-4 rounded-3xl min-h-fit min-w-fit">
            <img src={doctor.photo.secure_url} alt={i} className=" max-h-40 mx-auto my-4" />
            <h1>{doctor.username}</h1>
            <ul className="grid grid-cols-2 my-5">
              {doctor.specialization.map((skill,i)=>{
                return (
                  <LinkSkill key={i} to={`category/${skill}`} >
                    # {skill}
                  </LinkSkill>
                )
              })}
            </ul>
            <button className=' font-bold bg-greenDark p-2 rounded-lg' onClick={()=>navigate(`/doctor/${doctor.username}`)}>More Info.</button>
          </div>
  )
}

export default CardForm