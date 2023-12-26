import { createContext, useState , useContext, useEffect } from "react";
import { registerRequest,loginRequest, verifyTokenRequest ,feedBackRequest,getUsersRequest,updateUserRequest} from "../api/auth";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth  = ()=>{
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be called before")
    }
    return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [errors,setErrors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  

  const signup = async (user) => {
    try {
        const res = await registerRequest(user);
        
        setUser(res.data);
        setIsAuthenticated(true);
    } catch (error) {
        console.log(error);
        setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

        setUser(res.data);
        setIsAuthenticated(true);

    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }
  const update = async(user) =>{
    try {
      const res = await updateUserRequest(user);
      setUser(res.data)
      setIsAuthenticated(true);
      
    } catch (error) {

      console.log(error);
      setErrors(error.response.data);
    }

  }
  const feedback = async (feed) => {

    try {
      
      const res = await feedBackRequest(feed)
      console.log(res)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      
    }
  }
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    
  };
  const getUsers= async() => {
    try {
      const res = await getUsersRequest();
      
      return res.data;
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function get() {
      try {
        const res = await getUsers();
        if (Array.isArray(res)) {
          return setDoctors(res);
        }
        setDoctors([res]);
        
      } catch (error) {
        console.log(error);
      }
    }
    get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000);
      return ()=>clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    async function checkLogin(){
      const cookies = Cookies.get();

    if (cookies){
      try {
        const res= await verifyTokenRequest(cookies.token)
        if (!res.data){
          setIsAuthenticated(false)
        }
        setIsAuthenticated(true)
        setUser(res.data)

      } catch (error) {
        
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    }
    checkLogin(); 

  },[])

  return (
    <AuthContext.Provider
      value={{
        signup,
        getUsers,
        signin,
        user,
        doctors,
        logout,
        feedback,
        update,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
