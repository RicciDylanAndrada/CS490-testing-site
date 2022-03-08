import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TestContext from '../../../content/TestContext';
import {useState,useContext} from 'react'
import { TextareaAutosize } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginContext from '../../../content/LoginContext';
function Test() {


  
const {selectedTest,fetchTest,setTest,setTestWindow,testWindow,togglePopup,inTest}=useContext(TestContext)
const{token}=useContext(LoginContext)
const[studentSub,setStudentSub]=useState({
  answers:[]
})
let studentTest=fetchTest?.test.filter((value)=>{return(value.test_id == selectedTest)})
var newObject= { answer: [] };
studentTest.map((x)=>{
  return(
    x.tes_t.usesrname=token.username,
    x.tes_t.user_id=token.user_id


  )
})




const handleInputChange = (evt, id) => {
  setStudentSub({
    answers:{
      ...studentSub.answers,
      [evt.target.name]:evt.target.value
    }
  });

};
const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(studentSub)
  const result = Object.entries(studentSub.answers).map(([id, answer]) => ({id:id,answer}));
console.log(result)
  studentTest.map((x)=>{
    return(
      x.tes_t.questions.test=[studentSub.answers]
  
    )
  })
let questionArray = studentTest.map((x)=>{
  return (
    x.tes_t.questions
  )
})

newArray(result,questionArray)

  console.log(studentTest)
  axios({
    method: "POST",
    url:"/submission",
    data:{
      submission:studentTest,
      test_id: studentTest[0]?.test_id,
     }
  })
  .then((response) => {
    console.log(studentTest)

    console.log("returned")
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
  setStudentSub({
    answers:[]
  })
}







const newArray=(x,questionArray)=>{
  let arrayC = [];
  console.log(x)
  let flatArray = (questionArray.flat())

  flatArray.forEach(function(element){
  arrayC.push({
  question:element.question,
  question_id:element.question_id,
  question_id:element.question_id,
  points:element.points,

  answer:x.find(e=>e.id==element.question_id)?.answer
  });  
});




studentTest.map((x)=>{
  return(
    x.tes_t.questions=arrayC


  )
})
console.log(studentTest)
return (studentTest)
}

  return (

    <div className='h-full text-black bg-gradient-to-r from-red-700 to-blue-300  place-items-center p-10  flex flex-grow '>
   
  
{ studentTest && (
 
 <div className="h-screen w-full">

 <form classNamew="h-fit w-full" onSubmit={handleSubmit} >
 <div className="  overflow-auto  grid place-items-start rounded bg-white p-4   w-full h-full">
<div className="w-full h-full grid gap-24 ">

{fetchTest?.test.filter((value)=>{
         
    
         return(
          value.test_id == selectedTest

         
         )
       }).map((x)=>{

return( 
        x.tes_t.questions.map((y,index)=>{
          return(
            <div key={y.question_id} className='border-2 w-full h-80  p-4 grid-rows-6 grid ' > 
              <div className="grid grid-cols-3 row-span-1 rounded-md">

              <h1 className='place-self-start ' >{y.question_id}</h1>

                      <h1 className='text-center '  > {y.question.question}</h1>
                      <div></div>

              </div>
              <div className="row-span-4 text-center border-2 overflow-auto ">

              <textarea  required placeholder='Enter Answer' name={y.question_id} onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>

              </div>
          
            </div>
          )
        })

       )
       })}
</div>
 
       
       </div>
       <div className="grid p-4 bg-white h-full w-full place-items-center ">

<button  className="btn btn-success"  type="submit">Submit</button>


   </div>
       </form>
       <button  className='btn btn-info'><Link onClick={togglePopup()} to="/student" >Back</Link></button>
</div>






)

}
   









</div>
  )
}

export default Test