import React from 'react'
import SubmissionCard from '../../shared/SubmissionCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../../content/LoginContext'
import { useNavigate } from 'react-router-dom';
import TeacherCard from '../../shared/TeacherCard'

import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TeacherContext from '../../../content/TeacherContext'
function StudentSubmission() {
 const [testWindow,setTestWindow]=useState(false)
 const[fetchSubmission,setfetchSubmission]=useState("")
 const[selectedTest,setSelectedTest]=useState("")

  const{token} =useContext(LoginContext)
  
  const [test,setTest]=useState("")
    //fetch the test acconuts
    // would also have to check for section ID to display the certain test
    const navigate = useNavigate();
  
    let getButtonId1 = (e) => {
      console.log(e.currentTarget.id);
      setSelectedTest(e.currentTarget.id)
      setTestWindow(!testWindow)
      
      }
    
  
  
  //fetch submissions
  useEffect(()=>{

    
      axios({
        method: "POST",
        url:"/show_submission_student",
        data:{
          section: token?.section,
          username:token?.username,
          status:1,
  
          
         }
      })
      .then((response) => {
        console.log("this is the test")
        console.log(response.data)
        setfetchSubmission(response.data)
        
  
  
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
  
  
  },[selectedTest])
  
    return (
  
  
      
      <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-10 '>
         
       {testWindow?(  <h1>True</h1>     ):(






        <div class="w-11/12  h-4/6 relative  row-span-5 bg-white shadow-xl grid grid-rows-6 1 text-center rounded-md ">
  
  <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
    <h2 class="justify-self-start" >Completed Tests</h2>
  </div> 
  <div class="border-b-2 w-full   border-b-gray row-span-4  y  ">
  <div class="grid w-full grid-cols-10 border-b-2 ">
    <h1 className='col-span-9  border-r-2 '>Loop over Tests</h1>
    <h1 className='col-span-1 '>loopp over Result</h1>

  </div>

  
  </div> 
  <div class="border-b-2 w-full  grid  border-b-gray row-span-1  y p-2 ">
    <h2 class="justify-self-start" >Pagnation</h2>
  </div> 

  
  </div>

       )} 
      <div className='w-full h-full text-black   place-items-center   grid grid-rows-10 '>
  
      <div class=" row-span-1   grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
  
       
      
     
  
  
  
  <div class="grid grid-cols-3 gap-5 row-span-7 h-full w-full place-items-center content-start ">
  
  {fetchSubmission?.submissions?.map((x)=>{
    return(
      x?.submission?.map((y)=>{
        return(



          <SubmissionCard test_name={y.tes_t.usesrname} student_id = {y.tes_t.user_id} getButtonId1={getButtonId1}/>
        )
      })
    )
  })}
  </div>
       </div>
       </div>
    
         
  
  
  
  
  
  
  
  
  
      </div>
    )
  }
  

export default StudentSubmission