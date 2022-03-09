import axios from 'axios'
import React from 'react'
import data from "../data/test.json"
import Card from '../shared/Card'
import { useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../content/LoginContext'
import { PathRouteProps } from 'react-router-dom'
import Teacher from "../pages/Teacher"
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import TestContext from '../../content/TestContext'

function Student() {
  //const[fetchTest,setFetchTest]=useState("null")
  const [testWindow,setTestWindow]=useState(false)
const{token,} =useContext(LoginContext)
const{fetchTest,setSelectedTest,selectedTest,inTest,togglePopup} =useContext(TestContext)

const [test,setTest]=useState("")

  const navigate = useNavigate();

  let getButtonId = (e) => {
    setSelectedTest(e.currentTarget.id)
    togglePopup()
  
  }
  





  return (


    
    <div className='h-full text-black bg-gray-100  place-items-center   '>
       
      
    <div className='w-full h-full text-black  bg-gradient-to-r from-red-700 to-blue-300  place-items-center    '>

    <div class=" row-span-1   grid place-items-center  p-4  w-full h-full">

     
    <div class="w-11/12   row-span-1 bg-white shadow-xl grid grid-rows-6 1 text-center rounded-md ">

        <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
          <h2 class="justify-self-start" >Completed Tests</h2>
        </div> 
        <div class="border-b-2 w-full   border-b-gray row-span-4  y  ">
        {/* get test data and loop creating div of things below */}
        <div class="grid w-full grid-cols-10 border-b-2 ">
          <h1 className='col-span-9  border-r-2 '>Loop over Tests</h1>
          <h1 className='col-span-1 '>loopp over Result</h1>

        </div>

        
        </div> 
        <div class="border-b-2 w-full  grid  border-b-gray row-span-1  y p-2 ">
          <h2 class="justify-self-start" >Pagnation</h2>
        </div> 

        
        </div>
   



<div class="grid lg:grid-cols-3 md:grid-cols-2 p-4 gap-5 row-span-7 h-full w-full place-items-center content-start ">

{fetchTest?.test&&
  fetchTest?.test.map((value)=>{
         {/* let key = Object.keys(value.Questions)
        key.forEach((key,index) =>{
          return (        
          console.log(value.Questions[index])
          )
          

        }) */}
         return(
          <div className=" p-4 w-full grid h-44  card shadow-xl  side bg-white ">
           {value?.tes_t.test_name && (


           <div class=" grid place-items-center">
           <h1 className="   "  ><p>{value.tes_t.test_name}</p></h1>
            <button  onClick={getButtonId} id={value.test_id} 
            className='  btn btn-sm bg-blue-500 border-0    w-20  h-4  justify-self-center '  ><Link to="/test" >Enter</Link>
</button>

           </div>

           )}
           
           </div>
    

        




         
         )
       })
     }
</div>
     </div>
     </div>
  
       









    </div>
  )
}

export default Student