 import './App.css';
import LoginForm from './components/LoginForm'
import { useState,useEffect,useContext } from 'react'
import axios from "axios";
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import Teacher from './components/pages/Teacher'
import Student from './components/pages/Student'
import Test from './components/pages/Student/Test'
import Navbar from './components/layout/Navbar'
import LoginContext from './content/LoginContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Layout from './components/Layout';
import Questions from './components/pages/Teacher/Questions';
import Submissions from './components/pages/Teacher/Submissions';
import GradeTest from './components/pages/Teacher/GradeTest';
import StudentSubmission from './components/pages/Student/StudentSubmission';
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
<div className=' bg-gray-100  h-screen font-semibold   ' >


{!token.token && token.setToken!=="" &&token.token!== undefined?  
<div class="h-full w-full">
<LoginForm/>
{/* <Routes>
<Route path="/" element={<LoginForm/>}/>

</Routes> */}

</div>
        :( 
          <div class="h-fit">
            {token.status == 0? (



              <Routes>
<Route path="/login" element={<LoginForm/>}/>
<Route path="/" element={<Layout/>} >

    <Route element={<ProtectedRoutes  allowedRoles={0} />}>
    {/* <Route element={<ProtectedRoutes allowedRoles={['student']}/>}> */}
    <Route path="/" element={<Student/>}/>

       <Route path="/student" element={<Student/>}/>
       <Route path="/test" element={<Test/>}/>

      
        <Route path="/results" element={<StudentSubmission/>}/>


       {/* </Route> */}
     

     {/* <Route element={<ProtectedRoutes allowedRoles={['teacher']}/>}>

            <Route path="teacher" element={<Teacher/>}/>

      */}

     </Route>






</Route>

</Routes>
            )
:

              (<Routes>
  <Route path="/login" element={<LoginForm/>}/>


<Route path="/" element={<Layout/>} >
    <Route element={<ProtectedRoutes  allowedRoles={1} />}>
    {/* <Route element={<ProtectedRoutes allowedRoles={['student']}/>}> */}

       <Route path="/" element={<Teacher/>}/>
       <Route path="/teacher" element={<Teacher/>}/>

       <Route path="/questions" element={<Questions/>}/>

       <Route path="/submission" element={<Submissions/>}/>
       <Route path="/grade" element={<GradeTest/>}/>

       <Route path="/create" element={<LoginForm/>}/>

        <Route path="/submit" element={<LoginForm/>}/>


       {/* </Route> */}
     

   

     </Route>






</Route>

</Routes>)
            }
          
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