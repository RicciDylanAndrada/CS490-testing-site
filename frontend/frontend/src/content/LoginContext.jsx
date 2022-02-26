import {createContext,useState} from 'react'
import { useEffect } from 'react'
const LoginContext =createContext()


export const LoginProvider=({children})=>{

    const [ student,setStudent]=useState(null)
    const [ teacher,setTeacher]=useState(null)
    const [ user,setUser]=useState("")




 // useEffect(()=>{


//     if(token){
//         //then check if the user exists
//       const fetchProfile= async ()=>{
//         try{
//            const user = await fetch("/user",{
//                 method:'POST',
//                 headers:{
//                      Authorization:`Bearer ${token}`,
//                           },                     
//                       })
//                           const userInfo= await user.json()
//                           // check if student
//                           if(userInfo === 0){
//                               setUser("student")


//                           }
//                           //check if teacher
//                           else if ( userInfo ===1 ){
//                             setUser("teacher")


//                           }
//                           else{
//                               setUser("invaid")
//                           }

//                   }
//                   catch(err){
//           console.log(err)
//                   }
//               }
            
//               fetchProfile()
//     }
//     else{
//         // GET FROM FLASK
//       const hash = window.location.hash 
//           let token= window.localStorage.getItem("token")
//           if(!token && hash){
      
//             token = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1]
//             window.location.hash=""
//             window.localStorage.setItem("token",token)
//           }
//           setToken(token)
//     }
    
//   },[])


  
function getToken() {
  const userToken = localStorage.getItem('token');
  return userToken && userToken
}

const [token, setToken] = useState(getToken());

function saveToken(userToken) {
  localStorage.setItem('token', userToken);
  setToken(userToken);
};

function removeToken() {
  localStorage.removeItem("token");
  setToken(null);
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