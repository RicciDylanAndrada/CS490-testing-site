import {NavLink,useMatch,useResolvedPath} from 'react-router-dom' 
import {useContext} from 'react'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {AiOutlineFileDone} from 'react-icons/ai'
import LoginContext from '../../content/LoginContext'
import TestContext from '../../content/TestContext'
import { useNavigate } from 'react-router-dom';
import AllyProps from '../Tab/AllyProps'
import TabPanel from '../Tab/TabPanel'
import Box  from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import LoginForm from '../LoginForm'

import { useState } from 'react'
export default function Navbar() {


    const [tabValue,setTabValue]=useState(0);
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
      };
    const{token}=useContext(LoginContext)
    const{setToken,user,removeToken}=useContext(LoginContext)
    const{inTest}=useContext(TestContext)

    const handleLogout=()=>{
        removeToken()
      }   
    return (
        
        <div className=" h-screen  w-full  p-4    text-white bg-base-200   place-content-start place-items-center	">
    
           
        <div class=" grid place-items-center  gap-6  w-full ">
<div className=" ">
            <h1 className='font-extrabold text-md '  >Test Taker</h1>

</div>
        <div class="w-full grid  gap-12 place-content-center  place-items-center border-b-2">
        
            
           
       

        
        {token.status==1? (
            <div class="grid gap-2 h-28  "> <div class="grid  grid-cols-1  place-items-center    w-full">
            <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <HiOutlineDesktopComputer size="15px"  />
        </a>
        <button   className='text-xs basis-6/12 ml-2'>   
        
        
             <NavLink
            className={(navData) => (navData.isActive ? 'border-b-2 border-gray-200 ' : '')}
         to="teacher">Dashboard</NavLink> 
        
        
        </button> 
        </div>

        </div>

        </div>
         <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <button   className='text-xs basis-6/12 ml-2'>   
        
        
             <NavLink

className={(navData) => (navData.isActive ? ' border-b-2 border-gray-200  ' : '')}

                       to="/questions">Questions</NavLink> 
        
        
        </button> 
        </div>

        </div>
        <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <button   className='text-xs basis-6/12 ml-2'>   
        
        
        <NavLink
        className={(navData) => (navData.isActive ? ' border-b-2 border-gray-200  ' : '')}

         
         to="/submission">Submissions</NavLink> </button> 
        </div>

        </div>
        </div>
        ) 
        
        :(
       <div class="grid gap-2 h-28  "> <div class="grid  grid-cols-1  place-items-center    w-full">
            <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <HiOutlineDesktopComputer size="15px"  />
        </a>
        <button   className='text-xs basis-6/12 ml-2'>   
        
        
             <NavLink
            className={(navData) => (navData.isActive ?   'border-b-2 border-gray-200 '
                
             :
             
              '')}
         to="student">Dashboard</NavLink> 
        
        
        </button> 
        </div>

        </div>

        </div>
        
        <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <button   className='text-xs basis-6/12 ml-2'>   
        
        
        <NavLink
        className={(navData) => (navData.isActive ?  	'border-b-2 border-gray-200  ' : '')}

         
         to="/results">Submissions</NavLink> </button> 
        </div>

        </div>
        </div>
        ) 
        
        }
        
            
         
           
        </div>







        <NavLink to="/"  onClick ={handleLogout} className="btn  text-md bg-base-content text-black
     btn-sm rounded-btn">
            Logout
        </NavLink>
          
            </div>
            

        
        </div>
        
    )
}