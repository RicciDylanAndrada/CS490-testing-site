import React from 'react'
import SubmissionCard from '../../shared/SubmissionCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../../content/LoginContext'
import { useNavigate } from 'react-router-dom';
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

function Submissions() {
const[pointTest,setPointTest]=useState(false);
const [section, setsection] = React.useState('');

const [added,setAdded]=useState("");
const[fetchQuestion,setFetchQuestion]=useState("null")
const[fetchTest,setFetchTest]=useState("null")
const[submit,setSubmit]=useState(false)
const[fetchSubmission,setfetchSubmission]=useState([])

const handleSectionChange = (event) => {
    setsection(event.target.value);
  };

const [selectedTest,setSelectedTest]=useState(null)
const [testWindow,setTestWindow]=useState(false)

const[test,setTest]=useState({section:"",questions:[],test_name:""})
const {token} = useContext(LoginContext)
let getButtonId = (e) => {
console.log(e.currentTarget.id);
setSelectedTest(e.currentTarget.id)
testWindowClick(true)
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
useEffect(()=>{


    axios({
      method: "POST",
      url:"/show_submission_teacher",
      data:{
        section: section,
       }
    })
    .then((response) => {
      console.log("this is the test")
      console.log(response.data)
      setFetchTest(response.data)
      


    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })


},[added,section])


let studentTest=fetchTest?.test.filter((x)=>{
    return(
        x.tes_t.user_id == selectedTest
    )
})




const [checked, setChecked] = React.useState([]);
const [left, setLeft] = React.useState([]);
const [teacherPoints, setTeacherPoints] = React.useState({
  point:[

  ]
});




// const changePoints=(e)=>{
// setPoints({
  
//   point: [
//     ...points.point,
//      e.target.value
//     ]

   
// })}



const handleToggle = (value) => () => {
const currentIndex = checked.indexOf(value);
const newChecked = [...checked];

if (currentIndex === -1) {
  newChecked.push(value);
} else {
  newChecked.splice(currentIndex, 1);
}

setChecked(newChecked);
};





// const customList = (items) => (

// <div className="overflow-auto h-full w-80  flex flex-col space-y-4    ">

  
//     {items.map((value) => {
//       const labelId = `transfer-list-item-${value.question_id}-label`;

//       return (
//         <div className='border-2'>

       
//         <ListItem
//           key={value.question_id}
//           role="listitem"
//           className="border-2"
//           button
//           onClick={handleToggle(value)}
//         >
//           <ListItemIcon>
//             <Checkbox
//               checked={checked.indexOf(value) !== -1}
              
//               tabIndex={-1}
//               disableRipple
//               inputProps={{
//                 'aria-labelledby': labelId,
//               }}
//             />
//           </ListItemIcon>
//           <ListItemText id={labelId} primary={value.question.question} />
//         </ListItem>
//         </div>
//       );
//     })}
//     <ListItem />
    
// </div>
// );


const handleSubmit=(e)=>{
e.preventDefault()

setPointTest(!pointTest)
setTest(prev=>({
  ...prev,   section:token.section
  
    }))
setfetchSubmission(left)



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
         
         
         
         }
    
    
    
    
    
    
    
    
    
    </div>
     
           
           </div>
           <div className="grid p-4 bg-white h-full w-full place-items-center ">
    
    <button  className="btn btn-success"  type="submit">Submit</button>
    
    
       </div>
           </form>
           <button  className='btn  w-full btn-info'><Link  to="/teacher" >Back to Dashboard</Link></button>
    </div>
    
    
    
    
    
    
    )
    
    }
       
    
    
    
    
    
    
    
    
    
    </div>
      )
}


export default Submissions