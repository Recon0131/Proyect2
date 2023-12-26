import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import {ViewCv} from "./ViewCv.jsx";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CardProfile({ username }) {
  const { doctors } = useAuth();
  const [view, setView] = useState(null);

  return doctors.map((doctor, i) => {
    const find = doctor.username===username;

    if (find) {
      
      return (
        <div className=" bg-greenGray p-8 rounded-xl my-20 movil:mx-1">
          <section className=" grid grid-cols-2 gap-5 rounded-xl">
            <img
              src={doctor.photo.secure_url}
              alt={i}
              width="150"
              height="150"
              className=" rounded-3xl m-auto"
            />

            <div>
              <p className="font-bold">{doctor.username}</p>
              <p>{doctor.description}</p>
              <button
                onClick={() => setView(doctor.cv)}
                className=" bg-red-700 text-zinc-200 p-2 rounded-xl hover:bg-red-800 font-bold my-4 flex"
              >
                <FaBriefcase className=" my-auto mx-1" />
                View my cv
              </button>
            </div>
            <div className=" font-bold text-lg flex-col m-auto text-gray-600">
              <section className=" flex gap-2">
                <MdEmail className=" my-auto text-gray-500" />
                <p>{doctor.email}</p>
              </section>

              <section className="flex gap-2 text-gray-600">
                <FaPhoneAlt className=" my-auto text-gray-500" />
                <p>{doctor.phone}</p>
              </section>
            </div>
          </section>
          <ul className=" grid grid-cols-3 gap-5 mt-5 movil:grid-cols-2 movil:text-center ">
             {doctor.specialization.map((user, i) => (
              <li
                key={i}
                className=" bg-zinc-700 m-auto p-2 text-zinc-300 font-bold rounded-2xl"
              >
                #{user}
              </li>
            ))}
          </ul>
          {view ? (
            <div className=" fixed top-1/2 left-1/2 translate-x-porcent translate-y-porcent h-screen w-screen ">
              <div className=" absolute opacity-80 bg-black z-0 h-screen w-screen"/>
              <section className=" z-30 absolute top-1/2 left-1/2 translate-x-porcent translate-y-porcent h-screen w-screen">
              <AiOutlineCloseCircle className=" text-red-900 z-30 text-3xl absolute right-5 my-2 cursor-pointer" onClick={()=>setView(null)}/>
              <ViewCv view={view}/>
              </section>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  });
}

export default CardProfile;
