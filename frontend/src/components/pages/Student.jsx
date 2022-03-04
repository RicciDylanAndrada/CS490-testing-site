<<<<<<< HEAD
import React from 'react'
import data from "../data/test.json"
import Card from '../shared/Card'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../content/LoginContext'
import { PathRouteProps } from 'react-router-dom'
import Teacher from "../pages/Teacher"
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Student() {
const [test,setTest]=useState("")
  //fetch the test acconuts
  // would also have to check for section ID to display the certain test
  const navigate = useNavigate();

 let getButtonId = (e) => {
        console.log(e.currentTarget.id);
        setTest(e.currentTarget.id)
      }
  return (


    
    <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-10 '>
        {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
        {/* <Link to="test">Favorite hobby link</Link>
        <button onClick={() => navigate("test")}>Go forward</button>
      <button onClick={() => navigate(-1)}>Go back</button> */}
      
    <div class=" row-span-2  grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
        
    </div>
    <div class="w-11/12  h-5/6 relative bottom-24 row-span-2 bg-white shadow-xl grid grid-rows-6 1 text-center rounded-md ">

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
   



<div class="grid grid-cols-3 row-span-7 h-full w-full place-items-center">

{data?.tests &&
       data?.tests.map((value)=>{
         {/* let key = Object.keys(value.Questions)
        key.forEach((key,index) =>{
          return (        
          console.log(value.Questions[index])
          )
          

        }) */}
         return(
           <Card test_id={value.test_name} getButtonId={getButtonId} />

        




         
         )
       })
     }
</div>
       
      








    </div>
  )
}

=======
import React from 'react'
import data from "../data/test.json"
import Card from '../shared/Card'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../content/LoginContext'
import { PathRouteProps } from 'react-router-dom'
import Teacher from "../pages/Teacher"
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Student() {
const [test,setTest]=useState("")
  //fetch the test acconuts
  // would also have to check for section ID to display the certain test
  const navigate = useNavigate();

 let getButtonId = (e) => {
        console.log(e.currentTarget.id);
        setTest(e.currentTarget.id)
      }
  return (


    
    <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-10 '>
        {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
        {/* <Link to="test">Favorite hobby link</Link>
        <button onClick={() => navigate("test")}>Go forward</button>
      <button onClick={() => navigate(-1)}>Go back</button> */}
      
    <div class=" row-span-1   grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
        
    </div>
    <div class="w-11/12  h-4/6 relative bottom-28 row-span-1 bg-white shadow-xl grid grid-rows-6 1 text-center rounded-md ">

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
   



<div class="grid grid-cols-3 row-span-7 h-full w-full place-items-center content-start ">

{data?.tests &&
       data?.tests.map((value)=>{
         {/* let key = Object.keys(value.Questions)
        key.forEach((key,index) =>{
          return (        
          console.log(value.Questions[index])
          )
          

        }) */}
         return(
           <Card test_id={value.test_name} getButtonId={getButtonId} />

        




         
         )
       })
     }
</div>
       
      








    </div>
  )
}

>>>>>>> 9ddfe5ef7eb18d900881747eb0764a6456226c65
export default Student