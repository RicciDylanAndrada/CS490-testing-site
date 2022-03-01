 import './App.css';
import LoginForm from './components/LoginForm'
import { useState,useEffect,useContext } from 'react'
import axios from "axios";
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import Teacher from './components/pages/Teacher'
import Student from './components/pages/Student'
import Navbar from './components/layout/Navbar'
import LoginContext from './content/LoginContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Layout from './components/Layout';
function App() {
  const {user,token,setToken}=useContext(LoginContext)

  const [profileData, setProfileData] = useState(null)



  // useEffect(() => {
  //     axios({
  //       method: "GET",
  //       url:"/profile",
  //     })
  //     .then((response) => {
  //       const res =response.data
  //       setProfileData(({
  //         profile_name: res.name,
  //         about_me: res.about}))
  //     }).catch((error) => {
  //       if (error.response) {
  //         console.log(error.response)
  //         console.log(error.response.status)
  //         console.log(error.response.headers)
  //         }
  //     })
  // },[])
  

  return (
<div className=' h-screen'>


{!token.token && token.setToken!=="" &&token.token!== undefined?  
<div class="h-full w-full">
<Routes>
<Route path="/" element={<LoginForm/>}/>

</Routes>

</div>
        :( 
          <div class="">

          <Routes>
<Route path="/" element={<Layout/>} >
    <Route element={<ProtectedRoutes />}>
    {/* <Route element={<ProtectedRoutes allowedRoles={['student']}/>}> */}

       <Route path="/student" element={<Student/>}/>
       <Route path="/student/test" element={<LoginForm/>}/>
        <Route path="/student/test/submit" element={<LoginForm/>}/>


       {/* </Route> */}
     

     {/* <Route element={<ProtectedRoutes allowedRoles={['teacher']}/>}>

            <Route path="teacher" element={<Teacher/>}/>

      */}

     </Route>
{/* <Route path="*" element={<Missing/>}/> */}






</Route>

</Routes>
</div>

        )}
</div>

  )};

export default App;
//       <div className=" h-screen">

//       <Navbar/>

// <main>
// <Routes>
// {/** Check for user exists   */}

// { !token &&  !user &&token!="" && token !==undefined?(
  
// <Route path="/" element={<LoginForm setToken={setToken} />}> </Route>
// )
//  :
//    user==='teacher'?  <>

//         <Route element ={<ProtectedRoutes/>}/>
//      <Route path="/teacher" element={<Teacher/>}/> )
//      </>


//        : 

//        <>
//        <Route element ={<ProtectedRoutes/>}/>

//       <Route path="/student" element={<Student/>}/> 
//       </>
// }

// </Routes>
// </main>

        
//         {/* {profileData?.profile_name &&
//          <div className="App bg-slate-500 h-screen w-full" >

//               <LoginForm date={profileData}  />
//             </div>
//         } */}
//     </div>


     
   
//   );
// }