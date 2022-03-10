import React from 'react'
import axios from 'axios';
import TestContext from '../../../content/TestContext';
import {useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom';
import LoginContext from '../../../content/LoginContext';
import { AutoTabProvider } from 'react-auto-tab'
import * as indentation from 'indent-textarea';

function Test() {

const {selectedTest,fetchTest,setTest,setTestWindow,testWindow,togglePopup,inTest}=useContext(TestContext)
const{token}=useContext(LoginContext)
const[studentSub,setStudentSub]=useState({
  answers:[]
})
useEffect(()=>{
  const textarea = document.querySelector('textarea');
indentation.watch(textarea);
})


let studentTest=fetchTest?.test.filter((value)=>{return(value.test_id == selectedTest)})
var newObject= { answer: [] };
studentTest.map((x)=>{
  return(
    x.tes_t.usesrname=token.username,
    x.tes_t.user_id=token.user_id
  )
})





    function keyHandler(e) {
        var TABKEY = 9;
        if(e.target.keyCode == TABKEY) {
            e.target.value += "\t";
            if(e.preventDefault) {
                e.preventDefault();
            }
        }
    }






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
      section: token?.section,
      username:token?.username
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





{fetchTest?.test&& 
       fetchTest?.test.filter((x)=>{
   return(
     x.test_id == selectedTest
   )
 })
     
 .map((val)=>{
   return (val.tes_t.questions.map((value,index)=>{
     return(
      <div key={value.question_id} className='border-2 w-full h-80 grid-rows-2  p-4  grid ' > 
      <div class="w-full grid-rows-2  place-items-center grid">
         
<div className='w-full grid grid-cols-2 place-items-center' >
<div>

<h1 className="text-sm" >  Category:</h1>
<h1>{value.question.category}</h1>

</div>

<div>

<h1 className="text-sm" >  Difficulty:</h1>
<h1> {value.question.difficulty}</h1>

</div>
</div>
<div class="w-full grid text-center">
<h1>{value.question.question}</h1>

</div>       
      </div>
      
         


         <div className="row-span-4 text-center border-2 overflow-auto ">
         <AutoTabProvider>

<textarea  onKeyDown={(e)=>keyHandler(e)} required placeholder='Enter Answer' name={value.question_id} onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>
</AutoTabProvider>
</div>
     </div>)
   }))
 })
     
     
     
     }




</div>
 
       
       </div>
       <div className="grid p-4 bg-white h-full w-full place-items-center ">

<button  className="btn btn-success" onClick={togglePopup} type="submit">Submit</button>


   </div>
       </form>
       <button  className='btn  w-full btn-info'><Link onClick={togglePopup} to="/student" >Back to Dashboard</Link></button>
</div>






)

}
   









</div>
  )
}

export default Test