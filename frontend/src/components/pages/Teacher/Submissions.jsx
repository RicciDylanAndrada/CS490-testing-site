import React from 'react'
import TeacherCard from '../../shared/TeacherCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../../content/LoginContext'
import { useNavigate } from 'react-router-dom';

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
      method: "GET",
      url:"/question"
    })
    .then((response) => {
      //console.log(response.data)
      setFetchQuestion(response.data)
      setRight(response.data?.question)


    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    axios({
      method: "POST",
      url:"/show_test",
      data:{
        section: token?.section,
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


},[added])

const [value,setValue]=useState({
  
  question_id:null, 
  answer:null  
});


const navigate = useNavigate();


const [checked, setChecked] = React.useState([]);
const [left, setLeft] = React.useState([]);
const [points, setPoints] = React.useState({
  point:[

  ]
});

const [right, setRight] = useState(fetchQuestion?.question);



const changePoints=(e)=>{
setPoints({
  
  point: [
    ...points.point,
     e.target.value
    ]

   
})}
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





const customList = (items) => (

<div className="overflow-auto h-full w-80  flex flex-col space-y-4    ">

  
    {items.map((value) => {
      const labelId = `transfer-list-item-${value.question_id}-label`;

      return (
        <div className='border-2'>

       
        <ListItem
          key={value.question_id}
          role="listitem"
          className="border-2"
          button
          onClick={handleToggle(value)}
        >
          <ListItemIcon>
            <Checkbox
              checked={checked.indexOf(value) !== -1}
              
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={value.question.question} />
        </ListItem>
        </div>
      );
    })}
    <ListItem />
    
</div>
);


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
// let Y ={
//   question1:question1,
//     category:category,
//     section:section,
//     test_cases:matrix,
//     function_name:functionName,
// }

return (arrayC)


}

// const change = (x)=>{
//   console.log(test)
//   axios({
//     method: "POST",
//     url:"/make_test",
//     data:{
//       section:test?.section,
//       tes_t: x,
//      }
//   })
//   .then((response) => {
//     console.log(test)

//   }).catch((error) => {
//     if (error.response) {
//       console.log(error.response)
//       console.log(error.response.status)
//       console.log(error.response.headers)
//       }
//   })
//   setAdded(" ")
//  setTest({section:"",questions:[],test_name:""})
// }

return (


  
  <div className='h-full text-black bg-gray-100  place-items-center   grid grid-rows-6   '>
      {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
      {/* <Link to="test">Favorite hobby link</Link>
      <button onClick={() => navigate("test")}>Go forward</button>
    <button onClick={() => navigate(-1)}>Go back</button> */}
   
  <div class=" row-span-1 grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
      
  </div>
  {!testWindow?( 
    <div class="row-span-3 w-11/12">

       {!pointTest? (
        <div class="w-11/12  h-full relative  md:bottom-12 lg:bottom-32  bg-white shadow-xl grid grid-rows-6 1 text-center ">

       
      <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
        <h1 class="justify-self-center place-self-center  text-lg " > New Test</h1>

       
      
      </div> 
      <div class=" w-full  row-span-4    ">
      {fetchTest && right && ( 
      <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-password-input"
        label="Test Name"
        name='test_name'
        type="question"
        value={test.test_name}
        onChange={e => setTest({test_name:e.target.value,section:token.section})}
        autoComplete="current-password"
        required
      />
      <div class="grid w-full  grid-cols-1  h-full ">
      
  <div class="grid grid-cols-3">

  <div class="grid place-items-center">
  <h1>Test Questions </h1>


  


  </div>
 
    <div class="  place-items-center grid ">
  
   </div>
   <div class="grid place-items-center">
  <h1> Question Bank </h1>


  <div class=" place-items-center h-80    overflow-auto ">


  
    </div>


  </div>


</div>        </div>
      <div class=" w-full  grid  place-items-center    p-5 ">
        <button type='"submit'  class="place-self-center  w btn btn-active   " >Add Points </button>
      </div> 
      </form>
      )}
      
      </div> 
      </div>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      )
      :
              (
                <div className='' >
                <div class="w-11/12  h-screen relative  md:bottom-12 lg:bottom-32  bg-white shadow-xl grid grid-rows-6 1 text-center ">

       
<div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
<h1 class="justify-self-center place-self-center  text-lg " > Question Bank </h1>



</div> 
<div class=" w-full  row-span-5   ">
{fetchTest && right && ( 
<form  className='h-full' onSubmit={handleSubmitFinal}>

<div class="grid w-full  grid-cols-1  h-full ">

<div class="grid grid-cols-1">




<div class="grid place-items-center  w-full">


<div class=" place-items-center   h-full w-full  overflow-auto ">
<div className='h-full grid place-items-start grid-cols-3  overflow-auto w-full flex-col space-y-4' >
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={section}
    label="Age"
    onChange={handleSectionChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>

{fetchSubmission.map( (x,index)=>{
return(

  <div className='border-2  grid place-items-center rounded-xl' > 
  <h1>{x.question.question}</h1>
  <input  type='number'  required placeholder='points' name={x.question_id}  onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200  rounded-md" ></input>
  </div>
)
})

}

</div>


</div>


</div>


</div>        </div>
<div class=" w-full  grid  place-items-center    p-5 ">
<button type='"submit'  class="place-self-center  w btn btn-active   " >Create Test </button>
</div> 
</form>
)}

</div> 
</div>
              </div>)}
              </div>):
              
              
               (
                <div class="w-11/12  h-6/6 relative  md:bottom-12 lg:bottom-32 row-span-2 bg-white shadow-xl grid grid-rows-6 1 text-center ">
    
    <div class="border-b-2 w-full grid  grid-cols-3    place-items-center border-b-gray row-span-1  y p-4 ">
      <button class="place-self-start btn btn-warning    text-lg "  onClick={()=>  testWindowClick(false)}> Exit </button>
      <h1 class="  place-self-center text-lg " > Test {selectedTest}</h1>


     
    
    </div> 
    <div class=" w-full  row-span-4    ">
    {selectedTest  && ( 
     
     <div className="grid w-full overflow-auto grid-cols-1  h-full ">
     {fetchTest?.test&& 
       fetchTest?.test.filter((x)=>{
   return(
     x.test_id == selectedTest
   )
 })
     
 .map((val)=>{
   return (val.tes_t.questions.map((value)=>{
     return(
       <div className='border-2 grid grid-cols-3 rounded-xl h-24 ' > 

       <div>

<h1 className="text-sm" >  Category:</h1>
<h1>{value.question.category}</h1>

</div>
       <h1>{value.question.question}</h1>
         <div>

         <h1 className="text-sm" >  Difficulty:</h1>
         <h1> {value.question.difficulty}</h1>

         </div>



     </div>)
   }))
 })
     
     
     
     }



 <div class="grid grid-cols-1">

 <div class="grid  p-3 overflow-auto place-items-center">






 </div>

   
 


</div>     


  </div>
  
     )}
    
    </div> 

            </div>) }


      <div class="grid  p-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 row-span-2 md:gap-4 sm:gap-4 h-full w-full place-items-center">


{fetchTest?.test&&
fetchTest?.test.map((value)=>{
       
       return(
         <TeacherCard  test_name ={value.tes_t.test_name}  test_id = {value.test_id} getButtonId={getButtonId} />

      




       
       )
     })
   }
</div>
     
    








  </div>
)
}


export default Submissions