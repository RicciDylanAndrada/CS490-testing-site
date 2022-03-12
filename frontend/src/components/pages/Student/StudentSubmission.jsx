import React from 'react'
import StudentSubmissionCard from '../../shared/StudentSubmissionCard'
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




console.log(selectedTest)
  console.log(fetchSubmission?.submissions?.filter((x)=>{
    return(
      x.submission.some((x)=>{
        return (
          x.test_id == selectedTest
        )})
    )
  }))
  
  
    return (
      <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-10 '>
       {testWindow&& fetchSubmission?( <div class="">
       {fetchSubmission&& (
         <div> 
    {  fetchSubmission?.submissions?.filter((x)=>{
      return(
        x?.submission?.some((v)=>{
          return(  v.test_id == selectedTest)
        }))}).map((x)=>{
      return(
        x?.submission?.map((w)=>{
          var sum = 0
              w.tes_t.questions.map((x)=>{
              sum+=Number(x?.question?.grade?.grade )
              
            })
            
          return(
            <div>
            <h1>TOTAL GRADE : {sum}</h1>

           <h1>{w.tes_t?.questions.map((value,index)=>{
             return(

              <div key={value.question_id} className='border-2 w-full h-80  p-4  grid ' > 
              <div class=" grid grid-cols-4 place-items-center ">
             
              <div className='grid place-items-center' >

<h1 className="text-sm" >  Category:</h1>
<h1>{value.question.category}</h1>


</div> 
<h1>{value.question.question}</h1>
<div className='grid place-items-center grid-cols-1'  >

         <h1 className="text-sm" >  Difficulty:</h1>
         <h1> {value.question.difficulty}</h1>


         </div>


        <div >
        <label> Points:  </label>
         <p   type='number'   placeholder='points'   name='grade'   className= "border-2 border-gray-200">{value?.question.grade.grade}</p>
        



        </div>
        
        
              </div>
       
         


         <div className="row-span-4 text-center border-2 overflow-auto grid ">
         <h1> Your Answer: {value.answer}</h1>
          {value.question.grade.test_cases.map((val)=>{

return(
     <div className='grid grid-cols-3 overflow-auto'>
          <h1> Case  {val.case.map((x,i)=>{
            if(i===0){
              return "["+x +', '
            }
            else{
              return x +"]"
            }
            
            })}  </h1>
       <h1>Correct Output: { typeof val.correct_output == 'boolean'? val.correct_output.toString():val.correct_output}</h1>
       <h1> Student Output: {val.output}</h1>

     </div>

         )})}
         <h1> Teacher Comment: {value.question.grade.comment}</h1>



</div>
     </div>
             )
           })}</h1>
            
           </div> )
            }))})
      
      }
         {/*  */}
         
         
         
         
         </div>
         
         
         
         )
       }
  
       </div>
     
       
        ):(







        <div class="w-11/12  h-4/6 relative  row-span-5 bg-white shadow-xl grid grid-cols-1 place-items-center 1 text-center rounded-md ">

  
  <h1>Select a Test to see Submission</h1>
  
          
  </div>
       )}               
      <div className='w-full h-full text-black   place-items-center   grid grid-rows-10 '>
  
      <div class=" row-span-1   grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
  <div class="grid grid-cols-3 gap-5 row-span-7 h-full w-full place-items-center content-start ">
  
  {fetchSubmission?.submissions?.map((x)=>{
    return(
      x?.submission?.map((y)=>{
        return(
          <StudentSubmissionCard test_name={y.tes_t.test_name} test_id = {y.test_id} getButtonId1={getButtonId1}/>
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