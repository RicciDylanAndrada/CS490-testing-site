import React from 'react'
import axios from 'axios';
import TestContext from '../../../content/TestContext';
import {useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom';
import LoginContext from '../../../content/LoginContext';
import { AutoTabProvider } from 'react-auto-tab'
import * as indentation from 'indent-textarea';
import TestQuestions from '../Student/TestQuestions'
import TestPagnate from './TestPagnate';
function Test() {

const {selectedTest,fetchTest,setTest,setTestWindow,testWindow,togglePopup,inTest}=useContext(TestContext)
const{token}=useContext(LoginContext)
const[studentSub,setStudentSub]=useState({
  answers:[]
})
// useEffect(()=>{
//   const textarea = document.querySelector('textarea');
// indentation.watch(textarea);
// },)


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

console.log(studentSub)
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

    <div className='h-screen text-black bg-white  place-items-center p-2   '>
{/* <div class="row-span-1 ">
<button  className='btn  w-full btn-info'><Link onClick={togglePopup} to="/student" >Back to Dashboard</Link></button>

</div> */}
  
{ studentTest && (
 
 <div className="  h-screen w-full">

 <form className="h-full  grid grid-rows-6  " onSubmit={handleSubmit} >
 <div className="  row-span-5 ">
<TestPagnate fetchTest={fetchTest} selectedTest={selectedTest} studentSub={studentSub} itemsPerPage={1}  keyHandler={keyHandler} handleInputChange={handleInputChange} />





 
       
       </div>
       <div className="row-span-1 grid place-items-center w-full ">

<button  className="btn btn-success w-52 "  onClick={togglePopup} type="submit">Submit</button>


   </div>
       </form>
</div>






)

}
   









</div>
  )
}

export default Test