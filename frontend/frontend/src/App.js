 import './App.css';
import LoginForm from './components/LoginForm'
import { useState,useEffect,useContext } from 'react'
import axios from "axios";
import {BrowserRouter, BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Teacher from './components/pages/Teacher'
import Student from './components/pages/Student'
import Navbar from './components/layout/Navbar'
import LoginContext from './content/LoginContext';

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
      <Router>

      <div className=" h-screen">

      <Navbar/>

<main className="bg-black h-screen">
<Routes>
{/** Check for user exists   */}

{ !token &&  !user &&token!="" && token !==undefined?(
  
<Route path="/" element={<LoginForm setToken={setToken} />}> </Route>
)
 :

   user==='teacher'?  

     <Route path="/teacher" element={<Teacher/>}/> 
       : 
      <Route path="/student" element={<Student/>}/> 
}

</Routes>
</main>

        
        {/* {profileData?.profile_name &&
         <div className="App bg-slate-500 h-screen w-full" >

              <LoginForm date={profileData}  />
            </div>
        } */}
    </div>
      </Router>


     
   
  );
}

export default App;