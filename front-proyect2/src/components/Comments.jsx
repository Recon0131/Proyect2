import React from "react";
import { useAuth } from "../context/AuthContext";

function Comments({ username }) {
  const { doctors } = useAuth();

  return doctors.map((doctor, i) => {
    const find = doctor.username === username;

    if (find) {
      return (
        <section className=" bg-greenGray text-zinc-400 rounded-lg mx-auto max-w-xl movil:w-96">
          <h1 className=" font-bold text-center p-2">Reviews</h1>
          
            <ul className=" mx-4 my-2 flex flex-row gap-5 overflow-x-scroll snap-x" >
            {doctor.feedback.map((feedback, i) => {
              return (
                <li className=" bg-greenDark rounded-xl m-auto text-center py-10 px-10 snap-center my-2 " key={i}>
                  <h2 className=" font-bold"> Name of patient: </h2>
                  <p>{feedback.name}</p>
                  <h2 className=" font-bold">Email of patient:</h2>
                  <p>{feedback.email}</p>
                  <h2 className=" font-bold"> Review:</h2>
                  <p> {feedback.message}</p>
                </li>
              );
            })}
            </ul>
          
        </section>
      );
    }
  });
}

export default Comments;
