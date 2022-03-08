import {createContext,useState} from 'react'
import { useEffect } from 'react'
const LoginContext =createContext()


export const LoginProvider=({children})=>{

    const [ student,setStudent]=useState(null)
    const [ teacher,setTeacher]=useState(null)
    const [ user,setUser]=useState("")






  
function getToken() {
  const userToken = localStorage.getItem('token');
  return userToken && userToken
}

const [token, setToken] = useState({
  token:getToken()
  });

function saveToken(userToken) {
  localStorage.setItem('token', userToken);
  setToken({
    token:token.token || '',
status: '',
token:token.usesrname || '',
user_id:"",

section:token.section|| ''});
};

function removeToken() {
  localStorage.removeItem("token");
  setToken({token:""});
}





    

const handleLogout=()=>{
  setToken("")
  window.localStorage.removeItem("token")
  

}   


  return(
    
    <LoginContext.Provider
     value={{
       token,
       setToken,
       student,
       setStudent,
       setTeacher,
       teacher,
       user,
       setUser,
       handleLogout,
       saveToken,
       token,
       setToken,
       removeToken
       
       }}>
        {children}
    </LoginContext.Provider>
)
  }
  export default LoginContext