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
  console.log(fetchSubmission.submissions?.map((x)=>{
    return(
      x.submission.map((x)=>{
        return (
          x.test_id === selectedTest
        )})
    )
  }))
  
  
    return (
  
  
      
      <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-10 '>
         
       {testWindow&& fetchSubmission?( <div class="">




       {fetchSubmission&& (
         
         
         
         
         
         
         
         
         <div> 
         <h1>hi</h1>
         {fetchSubmission.submissions[0].submission.filter((x)=>{
           return(
            x.test_id ==selectedTest

           )
         }).map((x)=>{
             return(

               <div>
                {x.tes_t.questions.map((value,index)=>{


                  return(

<div key={value.question_id} className='border-2 w-full h-96   p-4  grid ' > 

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


<div className='grid gri-cols-1 place-items-center' >
<label>Auto Graded Points:  </label>
<input   type='number'   placeholder='points'  defaultValue={value?.question?.grade?.grade} name='grade'   className= "border-2 border-gray-200" ></input>
<label>Function Name?:  </label>
<input       defaultValue={value?.question.grade.name_correct?'true':'false'} name='name_correct'   className= "border-2 border-gray-200" ></input>



</div>


</div>




<div className="row-span-4 text-center border-2 overflow-auto grid ">
<h1> Student Answer: {value.answer}</h1>
<div>
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
</div>

<textarea   placeholder='Enter Comment' name='comment'  className= "p-5 bg-gray-200 w-full h-3/5 place-self-end rounded-md" ></textarea>

</div>
</div>
)






                })}
               </div>
             )
           })
         }
         
         
         
         
         </div>
         
         
         
         )
       }
  
       </div>
     
       
        ):(






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



          <StudentSubmissionCard test_name={y.tes_t.username} test_id = {y.test_id} getButtonId1={getButtonId1}/>
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