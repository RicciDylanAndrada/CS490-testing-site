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
  const {token,setToken}=useContext(LoginContext)


  return (
<div className=' bg-gray-100  h-screen font-semibold   ' >


{!token.token && token.setToken!=="" &&token.token!== undefined?  
<div class="h-full w-full">
<LoginForm/>


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


     

   

     </Route>






</Route>

</Routes>)
            }
          
</div>

        )}
</div>

  )};

export default App;
