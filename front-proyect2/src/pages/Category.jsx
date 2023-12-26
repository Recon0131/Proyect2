import React from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Catalog } from "../components/Catalog";
import CardForm from "../components/CardForm";

function Category() {
  const { skill } = useParams();
  const { doctors } = useAuth();

  return (
    <div className=" text-zinc-400 justify-center mx-20 movil:mx-0">
      <Catalog />
      <div className="grid grid-cols-3 movil:grid-cols-1 gap-5">
        {doctors.map((doctor, i) => {
            
          const existe = doctor.specialization.some((hability) =>
            skill.includes(hability)
            
          );
          
          if (existe) {
            return (
              <CardForm doctor={doctor} i={i}/>
            );
          }
          
        })}
        
      </div>
    </div>
  );
}

export default Category;
