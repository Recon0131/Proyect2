import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  
  const navigate = useNavigate()

  return (
    <nav className=" bg-greenCard flex justify-between py-5 px-10 rounded-b-lg text-zinc-300 movil:px-2 movil:grid movil:justify-center" >
      <h1 className="text-2xl font-bold movil:py-2 movil:text-center">
        <Link to="/" className=" movil:hidden"> Find your doctor</Link>
        <img onClick={()=>navigate('/')} src="https://res.cloudinary.com/dpuap0fag/image/upload/v1703617752/log_faxlge.png" width="80" alt="logo" className=" hidden movil:flex movil:mx-auto my-2"/>
      </h1>
      <ul>
        {isAuthenticated ? (
          <div className="flex gap-x-4 movil:justify-center">
            <li>
              Welcome {user.username}
            </li>
            <li>
              <Link to="/profile" className=" hover:font-bold transition-all">My profile</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()} className=" hover:font-bold transition-all">
                Logout
              </Link>
            </li>
          </div>
        ) : (
          <div className=" flex gap-2 my-auto">
            <p>You are a doctor? </p>
            <li className=" hover:font-bold transition-all">
              <Link to="/login">Login</Link>
            </li>
            or
            <li className=" hover:font-bold transition-all">
              <Link to="/register">Register</Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}