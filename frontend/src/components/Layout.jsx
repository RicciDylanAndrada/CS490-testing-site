import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoginForm from './LoginForm'
import { useContext } from 'react'
import useAuth from './useAuth'
function Layout() {

  return (


    <main class=" ">
    <div class="fixed w-32 ">
<Navbar className="fixed w-full" />

</div>    
<div class="ml-32 ">
      <Outlet/>

</div>

    </main>
  )
}

export default Layout