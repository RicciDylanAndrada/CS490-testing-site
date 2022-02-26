import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoginForm from './LoginForm'
import { useContext } from 'react'
import useAuth from './useAuth'
function Layout() {

  return (


    <main>
    <Navbar/>
        
    <Outlet/>

    </main>
  )
}

export default Layout