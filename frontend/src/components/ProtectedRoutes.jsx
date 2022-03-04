<<<<<<< HEAD
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

=======
import { Navigate, Outlet,useLocation  } from "react-router-dom";
import LoginContext from "../content/LoginContext"
import LoginForm from "./LoginForm";
import useAuth from "./useAuth";

//const ProtectedRoutes = () => {
  const ProtectedRoutes = (allowedRoles) => {
  
    const{token}=useAuth()
    const location = useLocation()

    return (
      // token?.status==allowedRoles?

      // <Outlet/>:
      //?<Outlet/>:<Navigate to="/login" state={{from:location}} replace/>
      allowedRoles.allowedRoles==token.status?<Outlet/>:
      
      
      <Navigate to="/" state={{from:location}} replace/>
      )
};

>>>>>>> 9ddfe5ef7eb18d900881747eb0764a6456226c65
export default ProtectedRoutes;