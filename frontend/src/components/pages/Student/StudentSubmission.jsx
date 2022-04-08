import React from 'react'
import StudentSubmissionCard from '../../shared/StudentSubmissionCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../../content/LoginContext'
import { useNavigate } from 'react-router-dom';
import TeacherCard from '../../shared/TeacherCard'
import Pagnate from './Pagnate'
import ReactPaginate from 'react-paginate';

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
    
  
  
  useEffect(()=>{
   
    
      axios({
        method: "POST",
        url:"/show_submission_student",
        data:{
          section: token?.section,
          username:token?.username,
          status:2,
  
          
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
       {testWindow&& fetchSubmission?(
         
          <div class="w-full p-4 h-full">
       {fetchSubmission&& (

         <Pagnate fetchSubmission={fetchSubmission} itemsPerPage={1} selectedTest={selectedTest}/>
         
         
         
         )
       }
  
       </div>
     
       
        ):(

        <div class="w-11/12  h-4/6 relative  row-span-5 bg-white shadow-xl grid grid-cols-1 place-items-center 1 text-center rounded-md ">

  
  <h1>Select a Test to see Submission</h1>
  
          
  </div>
       )} 


       {!testWindow &&
       (

         <div>
         {!testWindow && fetchSubmission?.submissions?.map((x)=>{
    return(
      x?.submission?.map((y)=>{
        return(
          <StudentSubmissionCard test_name={y.tes_t.test_name} test_id = {y.test_id} getButtonId1={getButtonId1}/>
        )
      })
    )
  })}
         </div>
       )
       }              
     
    
         
  
  
  
  
  
  
  
  
  
      </div>
    )
  }
  

export default StudentSubmission