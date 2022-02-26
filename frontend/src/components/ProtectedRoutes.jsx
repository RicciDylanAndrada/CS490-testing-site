import { Navigate, Outlet,useLocation  } from "react-router-dom";
import LoginContext from "../content/LoginContext"
import LoginForm from "./LoginForm";
import useAuth from "./useAuth";

const ProtectedRoutes = () => {
  //const ProtectedRoutes = (allowedRoles) => {
  
    const{token}=useAuth()
    const location = useLocation()

    return (
      //auth?.roles?.find(role=>allowedRoles?.include(role))
      //?<Outlet/>:<Navigate to="/login" state={{from:location}} replace/>
      token?.token?<Outlet/>:
      
      
      <Navigate to="/" state={{from:location}} replace/>
      )
};

export default ProtectedRoutes;