import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoginForm from './LoginForm'
import { useContext } from 'react'
import LoginContext from '../content/LoginContext'
import useAuth from './useAuth'
function Layout() {
  const {token} = useContext(LoginContext)

  return (


    <div class=" ">


 
{token.status==-1? ( 
  
  
  
  <div class="h-screen w-full">
      <LoginForm/>

</div>

  )
  
  :


(
 


<main>

  <div class="fixed w-32 ">
<Navbar className="fixed w-full" />

</div>  
<div class="ml-32 ">
      <Outlet/>

</div>
  </main>
)
}


    
   


    </div>
  )
}

export default Layout