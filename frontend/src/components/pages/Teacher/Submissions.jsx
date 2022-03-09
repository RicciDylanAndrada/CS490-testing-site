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
function Submissions() {
const[pointTest,setPointTest]=useState(false);

const[submit,setSubmit]=useState(false)
const {setFilterSubmissionTest,
  fetchSubmission,setSelectedTest,fetchTest,setFetchTest,setsection,section,setFilter,filterSubmissionTest,setStudentID}=useContext(TeacherContext)
const handleSectionChange = (event) => {
    setsection(event.target.value);
  };

const [testWindow,setTestWindow]=useState(false)

const[test,setTest]=useState({section:"",questions:[],test_name:""})
const {token} = useContext(LoginContext)



let getButtonId = (e) => {
console.log(e.currentTarget.id);
setSelectedTest(e.currentTarget.id)
testWindowClick(true)

filterTest(e.currentTarget.id)
}
let getButtonId1 = (e) => {
  console.log(e.currentTarget.id)
  setStudentID(e.currentTarget.id)
  testWindowClick(true)
  
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
    console.log(filterSubmissionTest)

}
const testWindowClick = ()=>{
setTestWindow(!testWindow)
}
useEffect(()=>{
if(submit){
  console.log(test)

  change()
}
else{
  console.log(test)

  console.log("waiting")
}
},[submit])






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












const handleSubmitFinal=(e)=>{
console.log(test)

e.preventDefault()
const result = Object.entries(studentSub.answers).map(([id, answer]) => ({id:id,answer}));
console.log(result)
let finalArray = newArray(result,fetchSubmission)
console.log(finalArray)

setTest(prev=>({
  ...prev,   questions:finalArray
  
    }))
let finalTest=test

console.log(test)
}




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

const newArray=(x,questionArray)=>{
let arrayC = [];
console.log(x)
let flatArray = (questionArray.flat())

flatArray.forEach(function(element){
arrayC.push({
question:element.question,
question_id:element.question_id,
points:x.find(e=>e.id==element.question_id)?.answer
});

});

setTest(prev=>({
...prev,   questions:arrayC

  }))
setSubmit(" ")


return (arrayC)


}


console.log(section)




{/* {fetchSubmission?.test&& 
       fetchTest?.test.filter((x)=>{
   return(
     x.test_id == selectedTest
   )
 })
     
 .map((val)=>{
   return (val.tes_t.questions.map((value,index)=>{
     return(
      <div key={value.question_id} className='border-2 w-full h-80  p-4 grid-rows-6 grid ' > 

       <div>

<h1 className="text-sm" >  Category:</h1>
<h1>{value.question.category}</h1>

</div>
       <h1>{value.question.question}</h1>
         <div>

         <h1 className="text-sm" >  Difficulty:</h1>
         <h1> {value.question.difficulty}</h1>

         </div>

       <h1>{value.question.answer}</h1>

         <div className="row-span-4 text-center border-2 overflow-auto ">
<textarea  value={value.question.answer} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>

<textarea  required placeholder='Enter Answer' name={value.question_id} onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>

</div>
     </div>)
   }))
 })
     
     
     
     } */}




//      <FormControl fullWidth>
//      <InputLabel id="demo-simple-select-label">Section</InputLabel>
//      <Select
//        labelId="demo-simple-select-label"
//        id="demo-simple-select"
//        value={section}
//        label="Section"
//        onChange={handleSectionChange}
//      >
        //token?.section.sections.map((x)=>{
//             return(

//                 <div>
//        <MenuItem value={x}>x</MenuItem>


//                 </div>
//             )
//         })
//        <MenuItem value={"006"}>006</MenuItem>
//        <MenuItem value={"008"}>008</MenuItem>
//        <MenuItem value={"002"}>002</MenuItem>
//      </Select>
//    </FormControl>
//          </div>
//    <div class="grid h-screen w-full  gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
   
//    {fetchTest?.test&&
//    fetchTest?.test.map((value)=>{
          
//           return(
//             <SubmissionCard  test_name ={value.tes_t.test_name}  test_id = {value.test_id} getButtonId={getButtonId} />
   
         
   
   
   
   
          
//           )
//         })
//       }


return (
    <div className='h-screen text-black bg-gradient-to-r from-red-700 to-blue-300 p-4 '>
    
 


<div class="row-span-1 grid w-full grid-cols-3 h-fit  place-items-center">

{ token?.section.sections.map((x,i)=>{
            return(

                <div  key={i} >
                
       <button className='btn btn-square w-32  ' onClick={handleSectionChange} value={x}>Section{x}</button>


                </div>
            )
        })}

</div>
{/* {fetchTest?.test&&
  <div class="grid w-full ">
<table class="table-auto border-gray-400 row-span-3">
  <thead className='border-2 border-gray-400 col-span-3' >
    <tr className='border-2 border-gray-400'>
      <th className='col-span-2' >Test</th>
      <th className='col-span-2'>Section</th>
      <th className='col-span-2' ># of Questions</th>
    </tr>
  </thead>
  <tbody className='border-2 border-gray-400' >
   
    {
  fetchTest?.test.map((value,i)=>{
         
         return(

          <tr className='border-2 border-gray-400 0'>
           <td onClick={console.log("hello")} >{value.tes_t?.test_name}</td>
          <td className='text-black col-span-2' >{value.tes_t?.section}</td>
          <td className='text-black' >{value.tes_t?.questions?.length}</td>

           </tr>
         
         )
       })
     }
   
  </tbody>
</table>
</div>
     } */}
{fetchTest?.test&& 


<div className='grid grid-cols-3 grid-rows-2 ' >

{

  fetchTest?.test.map((value,i)=>{
         
         return(
           <TeacherCard key={i} test_name ={value.tes_t.test_name}  test_id = {value.test_id} getButtonId={getButtonId} />

        




         
         )
       })
}  




<div class="">
{filterSubmissionTest &&

(
<div class="">
{fetchSubmission?.submissions?.map((x)=>{
    return(
      x?.submission?.map((y)=>{
        return(



          <SubmissionCard test_name={y.tes_t.usesrname} student_id = {y.tes_t.user_id} getButtonId1={getButtonId1}/>
        )
      })
    )
  })}</div>
)
  
}

</div>
</div>
  
     }




    
    {/* {fetchTest?.test&& 
           fetchTest?.test.filter((x)=>{
       return(
         x.test_id == selectedTest
       )
     })
         
     .map((val)=>{
       return (val.tes_t.questions.map((value,index)=>{
         return(
          <div key={value.question_id} className='border-2 w-full h-80  p-4 grid-rows-6 grid ' > 
    
           <div>
    
    <h1 className="text-sm" >  Category:</h1>
    <h1>{value.question.category}</h1>
    
    </div>
           <h1>{value.question.question}</h1>
             <div>
    
             <h1 className="text-sm" >  Difficulty:</h1>
             <h1> {value.question.difficulty}</h1>
    
             </div>
    
    
             <div className="row-span-4 text-center border-2 overflow-auto ">
    
    <textarea  required placeholder='Enter Answer' name={value.question_id} onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>
    
    </div>
         </div>)
       }))
     })
         
         
         
         } */}
    
    
    
    
    
    
    
    
    
    
     
           
           
           
           
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
      )
}


export default Submissions