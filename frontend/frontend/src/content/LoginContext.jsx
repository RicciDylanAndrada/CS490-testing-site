import {createContext,useState} from 'react'
import { useEffect } from 'react'
const LoginContext =createContext()


export const LoginProvider=({children})=>{

    const [token,setToken]=useState(null)
    const [ student,setStudent]=useState(null)
    const [ teacher,setTeacher]=useState(null)
    const [ user,setUser]=useState("")
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


    const getToken=()=>{
        const userToken = window.localStorage.getItem("token")
        return userToken && userToken
    }
    const [token,setToken]=useState(getToken())

    const saveToken=()=>{
        window.localStorage.setItem('token',userToken);
        setToken(userToken)
    }


const logIn = async (info) =>{
    try{
        const user = await fetch("/token",{
             method:'POST',
             headers:{
                  Authorization:`Bearer ${token}`,
                       }, 
            body:  JSON.stringify(info)
                              
                   })

                       const response= await user.json()
                       setToken(response.data.access_token)
                       setUser(response.data.user)

                       

               }
               catch(err){
       console.log(err)
       console.log(err.response)
       console.log(err.response.status)

       
               }
               setloginForm(({
                email: "",
                password: ""}))
        
              info.preventDefault()
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
       logIn,
       token,
       setToken
       
       }}>
        {children}
    </LoginContext.Provider>
)
  }
  export default LoginContext