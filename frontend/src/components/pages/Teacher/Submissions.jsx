import React from 'react'
import SubmissionCard from '../../shared/SubmissionCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../../content/LoginContext'
import { useNavigate } from 'react-router-dom';
import TeacherCard from '../../shared/TeacherCard'


import TeacherContext from '../../../content/TeacherContext'
function Submissions() {
const navigate= useNavigate()
const[submit,setSubmit]=useState(false)
const {
  setAutograded,
  fetchSubmission,autoGraded,studentID,setTemp,setSelectedTest,fetchTest,setsection,section,setFilter,filterSubmissionTest,setStudentID,selectedTest}=useContext(TeacherContext)
const handleSectionChange = (event) => {
    setsection(event.target.value);
  };

const [testWindow,setTestWindow]=useState(false)

const[test,setTest]=useState({section:"",questions:[],test_name:""})
const {token} = useContext(LoginContext)



let getButtonId = (e) => {
//console.log("getButtonId, selectedTest->",e.currentTarget.id);
setSelectedTest(e.currentTarget.id)
testWindowClick(!testWindow)

filterTest(e.currentTarget.id)

}
let getButtonId1 = (e) => {
  //console.log("getButtonID1, studentID-> ",e.currentTarget.id)
  setStudentID(e.currentTarget.id)
  testWindowClick(!testWindow)
  callAutoGrade(e.currentTarget.id)

  
  
  }
let filterTest=(id)=>{
  console.log("here->",fetchSubmission)
  console.log(section)
  let filtersubmissionTest= fetchSubmission?.submissions?.map((x)=>{
    return(
      x?.submission?.filter((y)=>{
        return(y.test_id==id)
      })
    )
  })
  setFilter(filtersubmissionTest)
    //console.log(filterSubmissionTest)

}
const testWindowClick = ()=>{
setTestWindow(!testWindow)
}
useEffect(()=>{
if(submit){
  // console.log(test)

  change()
}
else{
  console.log(test)

  console.log("waiting")
}
},[submit])

const callAutoGrade=(x)=>{
  // console.log("callAutoGrade, studentID->",x)

  // console.log("callAutoGrade, test_Id->",selectedTest)
  // console.log("callAutoGrade, fetchSubmision->",fetchSubmission)
  const testid=selectedTest
  const studentid=x
  const studenttest1 = (fetchSubmission?.submissions?.filter((x)=>{
    return(
      x?.submission?.some((y)=>{
        return(y?.test_id==testid && y.tes_t.user_id ==studentid)
      })
    )
  }))
  
  console.log(studenttest1)


axios({
    method: "POST",
    url:"/autograde",
    data:{
      submission:studenttest1

     }
  })
  .then((response) => {
    console.log("autograde response",response.data)
    setAutograded(response.data)
    setTemp(response.data)
    navigate("/grade")


  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
  setTemp(autoGraded)
  setSelectedTest("")
  setStudentID("")
  
 
}




const[studentSub,setStudentSub]=useState({
answers:[]
})


const handleInputChange = (evt, id) => {
setStudentSub({
  answers:{
    ...studentSub.answers,
    [evt.target.name]:evt.target.value
  }
});

};












// const handleSubmitFinal=(e)=>{
// console.log(test)

// e.preventDefault()
// const result = Object.entries(studentSub.answers).map(([id, answer]) => ({id:id,answer}));
// console.log(result)
// let finalArray = newArray(result,fetchSubmission)
// console.log(finalArray)

// setTest(prev=>({
//   ...prev,   questions:finalArray
  
//     }))

// }




const change=()=>{
axios({
  method: "POST",
  url:"/make_test",
  data:{
    section:test?.section,
    tes_t: test,
   }
})
.then((response) => {

}).catch((error) => {
  if (error.response) {
    console.log(error.response)
    console.log(error.response.status)
    console.log(error.response.headers)
    }
})
}

// const newArray=(x,questionArray)=>{
// let arrayC = [];
// console.log(x)
// let flatArray = (questionArray.flat())

// flatArray.forEach(function(element){
// arrayC.push({
// question:element.question,
// question_id:element.question_id,
// points:x.find(e=>e.id==element.question_id)?.answer
// });

// });

// setTest(prev=>({
// ...prev,   questions:arrayC

//   }))
// setSubmit(" ")


// return (arrayC)


// }










return (
    <div className='h-screen text-black bg-white to-blue-300 p-4 '>
    
 


<div class="row-span-1 grid w-full grid-cols-3 h-fit  bg-white  place-items-center">

{ token?.section.sections.map((x,i)=>{
            return(

                <div key={i}  >
                
       <button className='btn btn-square w-32  ' onClick={handleSectionChange} value={x}>Section{x}</button>


                </div>
            )
        })}

</div>

{fetchTest?.test&& 


<div className='grid grid-cols-1 grid-rows-2 gap-40 bg-white to-blue-300 ' >
<div class="w-full row-span-1  h-full grid grid-cols-3 place-items-center">

{

fetchTest?.test.map((value,i)=>{
       
       return(
         <TeacherCard key={value.test_id} test_name ={value.tes_t.test_name}  test_id = {value.test_id} getButtonId={getButtonId} />

      




       
       )
     })
}  
</div>





<div class="w-full grid-rows-2 gap-6 h-full ">

<div class="w-full grid place-items.center text-center">
</div>


<div class="  w-full grid grid-cols-3 place-items-center">
{fetchSubmission?.submissions?.filter((x)=>{
      return(
        x?.submission?.some((v)=>{
          return(   v.test_id == selectedTest)
        }))}).map((x)=>{
    return(
      x?.submission?.map((y,i)=>{
        return(

              

          y.test_id == selectedTest &&    <SubmissionCard  key={i} test_name={y.tes_t.usesrname} student_id = {y.tes_t.user_id} getButtonId1={getButtonId1}/>
        )
      })
    )
  })}
</div>
  
  

  


</div>
</div>
  
     }



    </div>
      )
}


export default Submissions