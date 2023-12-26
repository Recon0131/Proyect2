import React from "react";
import { useAuth } from "../context/AuthContext";
import Catalog from "../components/Catalog";
import CardForm from "../components/CardForm";

function HomePage() {
  const { doctors } = useAuth();


  
  return (
    <div className=" text-zinc-400 justify-center mx-20 movil:mx-0">
      <Catalog/>
      
      <div className="grid grid-cols-3 gap-5 movil:grid-cols-1">
      {doctors.map((doctor, i) => {
        console.log(doctor)
        return (
          <CardForm i={i} doctor={doctor}/>
        );
        
      })}
      </div>
    </div>
  );
}

export default HomePage;
