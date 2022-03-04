<<<<<<< HEAD
import {Link} from 'react-router-dom' 
import {useContext} from 'react'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {AiOutlineFileDone} from 'react-icons/ai'

import LoginContext from '../../content/LoginContext'

export default function Navbar() {
    const{setToken,user,removeToken}=useContext(LoginContext)
    const handleLogout=()=>{
        removeToken()
      }   
    return (
        
        <div className=" h-screen  w-full  p-4    text-black	 bg-white   place-content-start place-items-center	">
    
           
        <div class=" grid place-items-center  gap-6  w-full ">
<div className=" ">
            <h1 >Test Taker</h1>

</div>
        <div class="w-full grid  gap-12 place-content-center  place-items-center border-b-2">
        
            
           
       <div class="grid gap-2 h-12"> <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-center">
        <a href="https://github.com/RicciDylanAndrada" class="hover:border-bg-orange basis-2/12  ">
        <HiOutlineDesktopComputer  size="15px"  />
        </a>
        <h1 className='text-xs basis-7/12 ml-2' >DashBoard</h1>

        </div>

        </div>
            
            <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a href="https://github.com/RicciDylanAndrada" class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <h1 className='text-xs basis-6/12 ml-2' >Results</h1>

        </div>

        </div>
            
           <a href="https://www.linkedin.com/in/riccidylanandrada/" className="hover:bg-orange">
           </a>

           
        </div>
        </div>







        <Link to="/"  onClick ={handleLogout} className="btn  text-md btn-error     btn-sm rounded-btn">
            Logout
        </Link>
          
            </div>
            

        
        </div>
        
    )
=======
import {Link} from 'react-router-dom' 
import {useContext} from 'react'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {AiOutlineFileDone} from 'react-icons/ai'
import LoginContext from '../../content/LoginContext'

export default function Navbar() {

    const{token}=useContext(LoginContext)
    const{setToken,user,removeToken}=useContext(LoginContext)
    const handleLogout=()=>{
        removeToken()
      }   
    return (
        
        <div className=" h-screen  w-full  p-4    text-black	 bg-white   place-content-start place-items-center	">
    
           
        <div class=" grid place-items-center  gap-6  w-full ">
<div className=" ">
            <h1 >Test Taker</h1>

</div>
        <div class="w-full grid  gap-12 place-content-center  place-items-center border-b-2">
        
            
           
       

        
        {token.status==1? (
            <div class="grid gap-2 h-28  "> <div class="grid  grid-cols-1  place-items-center    w-full">
            <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <HiOutlineDesktopComputer size="15px"  />
        </a>
        <h1 className='text-xs basis-6/12 ml-2' >Dashboard</h1>

        </div>

        </div>

        </div>
         <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <h1 className='text-xs basis-6/12 ml-2' >Questions</h1>

        </div>

        </div>
        <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <h1 className='text-xs basis-6/12 ml-2' >Submissions</h1>

        </div>

        </div>
        </div>
        ) 
        
        :
      (
        <div class="grid gap-2 h-16"> <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-center">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <HiOutlineDesktopComputer  size="15px"  />
        </a>
        <h1 className='text-xs basis-7/12 ml-2' >DashBoard</h1>

        </div>

        </div>
          
         <div class="grid  grid-cols-1  place-items-center    w-full">
       <div class=" w-full flex  justify-start">
        <a  class="hover:border-bg-orange basis-2/12  ">
        <AiOutlineFileDone size="15px"  />
        </a>
        <h1 className='text-xs basis-6/12 ml-2' >Results</h1>

        </div>

        </div>
        
        </div>
        
      )
        
        }
        
            
         
           
        </div>







        <Link to="/"  onClick ={handleLogout} className="btn  text-md btn-error     btn-sm rounded-btn">
            Logout
        </Link>
          
            </div>
            

        
        </div>
        
    )
>>>>>>> 9ddfe5ef7eb18d900881747eb0764a6456226c65
}