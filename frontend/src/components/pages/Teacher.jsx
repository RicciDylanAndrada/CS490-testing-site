import React from 'react'
import TeacherCard from '../shared/TeacherCard'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import LoginContext from '../../content/LoginContext'

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
import Box from '@mui/material/Box';


function Teacher() {
  const [section, setsection] = React.useState('');
  const[filterdCategory,setFilteredCategory]=useState("")
  const[filterdKeyword,setFilteredKeyword]=useState("")
  const[filterdDifficulty,setFilteredDifficulty]=useState("")

  

  const handleFilterChange=(e)=>{
    const name=e.target.name;
    const value =e.target.value;

    if (name =='category'){
      setFilteredCategory(value)
    }
    else if(name == 'difficulty'){
      setFilteredDifficulty(value)
    }
    else if(name =='keyword'){
      setFilteredKeyword(value)
    }


  }


  const handleSectionChange = (event) => {
    event.preventDefault();
    console.log(event.target.value)

      if(event.target.value){
        axios({
          method: "POST",
          url:"/show_test",
          data:{
            section: event.target.value,
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
      }
    

    setsection(" ")
    const pressed = event.target.value
    const here = pressed
    setsection(here);

  };

  const[pointTest,setPointTest]=useState(false);
  const [added,setAdded]=useState("");
  const[fetchQuestion,setFetchQuestion]=useState("null")
  const[fetchTest,setFetchTest]=useState("null")
  const[submit,setSubmit]=useState(false)
  const[testQuestions,setTestQuestions]=useState([])
const [selectedTest,setSelectedTest]=useState(null)
const [testWindow,setTestWindow]=useState(false)
const [done,setDone]=useState(false)
const [afterDone,setAfterDone]=useState(false)

const[test,setTest]=useState({section:"",questions:[],test_name:""})
const {token} = useContext(LoginContext)
let getButtonId = (e) => {
  console.log(e.currentTarget.id);
  setSelectedTest(e.currentTarget.id)
  setTestWindow(true)

}
const doneTest=()=>{
  setAfterDone(true)
}

const selectedTestWindow=()=>{
  setTestWindow(!testWindow)

}
const testWindowClick = ()=>{
  setSelectedTest(" ")
  setAfterDone(!afterDone)

if(pointTest){
  setPointTest(false)
  setLeft([])
setDone(true)
}
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

      
},[added,done])

  const [value,setValue]=useState({
    // student_id:null,
    // section:null,
    question_id:null, // from tab
    answer:null  // from input 
  });




  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
 

  const [right, setRight] = useState(fetchQuestion?.question);

  



const not =(a, b)=> {
  return a.filter((value) => b.indexOf(value) === -1);
}

const intersection = (a, b)=> {
  return a.filter((value) => b.indexOf(value) !== -1);
}
const leftChecked = intersection(checked, left);
const rightChecked = intersection(checked, right);


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



const handleAllRight = () => {
  setRight(right.concat(left));
  setLeft([]);
};



const handleCheckedLeft = () => {
  setLeft(left.concat(rightChecked));
  setRight(not(right, rightChecked));
  setChecked(not(checked, rightChecked));
  console.log(left)

};
const handleCheckedRight = () => {
  setRight(right.concat(leftChecked));
  setLeft(not(left, leftChecked));
  setChecked(not(checked, leftChecked));
};


const handleAllLeft = () => {
  setLeft(left.concat(right));
  setRight([]);
  console.log(left)
};


const customListRight = (items) => (

  <div className="overflow-auto max-h-80     w-full   flex flex-col space-y-4    ">
  
    
      {
        items.filter((x)=>{


        if (filterdCategory && !filterdDifficulty){
          return true;
        }
        else if( !filterdCategory && filterdDifficulty){
          return true;
        }
        let difficulty =
  filterdCategory && filterdDifficulty ? x?.question.difficulty == filterdDifficulty && x?.question.category == filterdCategory
    : true;
   
  let filterWord =
  filterdKeyword? x?.question.question.includes(filterdKeyword)
    : true;
    let both =
  filterdKeyword&& filterdCategory && filterdDifficulty? x?.question.question.includes(filterdKeyword) && x?.question.difficulty == filterdDifficulty && x?.question.category == filterdCategory
    : true;




return difficulty  && filterWord && both
        }).map((value) => {
        const labelId = `transfer-list-item-${value.question_id}-label`;

        return (
          <div  key={value.question_id} className='border-2 rounded-lg'>

         
          <ListItem
            key={value.question_id}
            role="listitem"
            className="border-2"
            button
            onClick={handleToggle(value)}
            sx={{ fontSize: "5px" }}

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

            
      <div className=' grid grid-rows-3 rounded-xl h-24 ' > 
            

            <ListItemText 

             id={labelId} secondary={value?.question?.category} />
            <ListItemText
 id={labelId} primary={value?.question?.question} />
            <ListItemText id={labelId} secondary={value?.question?.difficulty} />

            </div>
          </ListItem>
          </div>
        );
      })}
      <ListItem />
      
  </div>
);
const customList = (items) => (

  <div className="overflow-auto max-h-80     w-full   flex flex-col space-y-4    ">
  
    
      {items.map((value) => {
        const labelId = `transfer-list-item-${value.question_id}-label`;

        return (
          <div  key={value.question_id} className='border-2 rounded-lg'>

         
          <ListItem
            key={value.question_id}
            role="listitem"
            className="border-2"
            button
            onClick={handleToggle(value)}
            sx={{ fontSize: "5px" }}

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

            
      <div className=' grid grid-rows-3 rounded-xl h-24 ' > 
            

            <ListItemText 

             id={labelId} secondary={value?.question?.category} />
            <ListItemText
 id={labelId} primary={value?.question?.question} />
            <ListItemText id={labelId} secondary={value?.question?.difficulty} />

            </div>
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
  console.log(test)
  setTestQuestions(left)

      setLeft([])

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
  let finalArray = newArray(result,testQuestions)
  console.log(finalArray)
  
  setTest(prev=>({
    ...prev,   questions:finalArray
    
      }))
let finalTest=test
setSubmit(true)
}




const change=(x)=>{
  console.log(test)
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
  setTest({section:"",questions:[],test_name:""})
  setAfterDone(!afterDone)
  setSubmit(false)


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


if(fetchTest.test){

  let newFilter = fetchTest.test.filter((x)=>{
    return(
      x.test_id == selectedTest
    )
  })

  console.log()
}


console.log(filterdCategory,filterdDifficulty)
console.log(filterdCategory==" " || filterdCategory==null || filterdCategory==undefined?"true":"false")
console.log(right?.filter((x)=>{
  let difficulty =
  filterdDifficulty? x?.question.difficulty == filterdDifficulty
    : true;
    let category =
  filterdCategory? x?.question.category == filterdCategory
    : true;
  let filterWord =
  filterdKeyword? x?.question.question.includes(filterdKeyword)
    : true;




return difficulty && category && filterWord
      



  
}))
console.log(left)
  return (


    
    <div className='h-fit  text-black p-4  place-items-center bg-stone-50	  grid   '>
       
    {!testWindow?( 
      <>

         {!pointTest? (
          <div className="     bg-stone-50	 drop-shadow-2xl  w-full flex  flex-col  h-screen   text-center ">

         
        <div className="border-b-2 w-full grid  border-b-gray row-span-1 h-24   y p-2 ">
          <h1 className="justify-self-center place-self-center  text-2xl font-bold  " > Create A New Test</h1>
          
         
        
        </div> 
        <div className=" w-full   text-center    ">

        <div className="grid grid-cols-2"></div>
        {fetchTest && right && ( 
        <form className ='h-full' onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 pl-2 pr-2 p-2">
        <TextField
          id="outlined-password-input"
          label="Test Name"
          name='test_name'
          className='w-full'
          type="question text-center "
          value={test.test_name}
          onChange={e => setTest({...test,test_name:e.target.value})}
          autoComplete="current-password"
          required
        />
        <TextField
          id="outlined-password-input"
          label="Section"
          name='section'
          className='w-full'
          type="question text-center "
          value={test.section}
          onChange={e => setTest({...test,section:e.target.value})}
          autoComplete="current-password"
          required
        />
        </div>
       

        <div className="grid w-full    border-b-2 border-t-2 h-full ">
        
    <div className="grid grid-cols-2 border-l-2  border-gray-200">

    <div className="grid   border-b-2 place-items-center w-full border-r-2 ">
    <h1 className='m-2' >Question Bank </h1>
    <div class="grid grid-cols-3 w-full gap-2 pl-2 pr-2 ">
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterdDifficulty}
          label="Difficulty"
          onChange={e=> setFilteredDifficulty(e.target.value)}
          name="Difficulty"
        >
                  <MenuItem value={""}>None</MenuItem>

          <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterdCategory}
          label="Category"
          name="Category"
          onChange={e => setFilteredCategory(e.target.value)}
        >
          <MenuItem value={"Function"}>Function</MenuItem>
          <MenuItem value={"While"}>While</MenuItem>
          <MenuItem value={"For"}>For</MenuItem>
          <MenuItem value={"Recursion"}>Recursion</MenuItem>
          <MenuItem value={"Fail"}>Fail</MenuItem>
          <MenuItem value={""}>None</MenuItem>

          {/* <MenuItem value={"Chapter 4"}>Chapter 4</MenuItem>
          <MenuItem value={"Chapter 3"}>Chapter 3</MenuItem> */}
         

        </Select>
      </FormControl>
    </Box>
    <TextField  value={filterdKeyword} onChange={e=> setFilteredKeyword(e.target.value)} id="outlined-basic" label="Key Work" variant="outlined" />


    </div>
    
    <div className=" place-items-center w-full p-4 overflow-auto  h-full      ">
      <Grid
        
      item>{customListRight(right)}</Grid>
      </div>


    </div>
   
      
     <div className="grid place-items-center col-span-1  border-b-2 border-l-2">
    <h1 className='m-2' > Test Questions </h1>


    <div className=" place-items-center h-full  w-full p-4   overflow-auto ">
<div className='h-full flex flex-col  space-y-4' >
{customList(left)}

</div>

    
      </div>


    </div>

    <div className=" place-items-center col-span-2 grid w-full ">
      <Grid item>
      <Grid container direction="row" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≪ All 
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Selected &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            Selected &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            All ≫
          </Button>
        </Grid>
      </Grid>
     </div>
</div>      
 <div className="h-full w-full p-2 ">
          <button type='"submit'  className="place-self-right   btn btn-active   " >Add Points </button>
        </div> 
  </div>
 
        </form>
        )}
        
        </div> 
        </div>
        
      
        )
        :
                (
                  
                  <div className="w-full       bg-white shadow-xl grid grid-rows-6 1 text-center ">

         
<div className="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
  <h1 className="justify-self-center place-self-center  text-lg " > Question Bank </h1>
  

</div> 
<div className=" w-full  row-span-5   ">
{fetchTest && right && ( 
<form  className='h-full' onSubmit={handleSubmitFinal}>

<div className="grid w-full  grid-cols-1  h-full ">

<div className="grid grid-cols-1 p-4">




<div className="grid place-items-center  w-full">


<div className=" place-items-center   h-full w-full  overflow-auto ">
<div className='h-full grid  place-items-start grid-cols-1  overflow-auto w-full flex-col ' >


{testQuestions.map( (x,index)=>{
  return(

    <div key={index} className='border-2  grid rows-2   place-items-start rounded-xl  w-full'  > 
    <div className='grid grid-cols-3 w-full'>

    <div className="">
    <h1 className="text-sm" >  Category:</h1>
    <h1>{x.question.category}</h1>
    </div>
    <div className="">
    <h1 className="text-sm" >  Question:</h1>

    <h1>{x.question.question}</h1>
    </div>
    <div className="">
    <h1 className="text-sm" >  Difficulty:</h1>

    <h1>{x.question.difficulty}</h1>
    </div>
   

    </div>
    <input  type='number'  required placeholder='points' name={x.question_id}  onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200  w-full rounded-md" ></input>
    </div>
  )
})

}

</div>


</div>


</div>


</div>   
<div className=" w-full  grid  place-items-center    p-5 ">
  <button type='"submit'   className="place-self-center  w btn btn-active   " >{!afterDone?"Create Test":" Test Created "} </button>

</div> 
     </div>

</form>

)}

</div> 
  <button type='"'  className="place-self-center  w btn btn-active   " onClick={testWindowClick} >Return to Dashboard </button>

</div>
                )}
                
                </>):
                
                
                 (
                  <div className="w-11/12  h-6/6   row-span-2 bg-white shadow-xl grid grid-rows-6 1 text-center ">
      
      <div className="border-b-2 w-full grid  grid-cols-3    place-items-center border-b-gray row-span-1  y p-4 ">
        <button  onClick={selectedTestWindow} className="place-self-start btn btn-warning    text-lg "   > Exit </button>
        <h1 className="  place-self-center text-lg " > Test {selectedTest}</h1>


       
      
      </div> 
      <div className=" w-full  row-span-4    ">
      {selectedTest  && ( 
     
      <div className="grid w-full p-4 overflow-auto grid-cols-1  h-full ">
      {fetchTest?.test&& 
        fetchTest?.test.filter((x)=>{
    return(
      x.test_id == selectedTest
    )
  })
      
  .map((val)=>{
    return (val.tes_t.questions.map((value)=>{
      return(
        <div className='border-2 rounded-xl h-24   grid place-items-center grid-rows-2' >
                            <div className="grid grid-cols-4 w-full gap-2 place-items-center">
                            <div >                      
                            <p>Difficulty</p>
<h1 className="font-light     " >
{value.question.difficulty}
</h1></div>
<div >
<p>Category</p>

<h1 className="font-light     ">{value.question.category}</h1>

</div>


<h1>                            <div class="">
<p>Restraint</p>
<h1 className="font-light     " > {value.question.restraint}</h1>
</div>
</h1>
<div class="">
<p>Points</p>
<h1 className="font-light     " > {value.points}</h1>
</div>
                            </div> 
                            <h1  >   {value.question?.question} </h1>
                      </div>)
    }))
  })
      
      
      
      }



  <div className="grid grid-cols-1">

  <div className="grid  p-3 overflow-auto place-items-center">
 





  </div>
 
    
  


</div>     


   </div>
   
      )}
      
      </div> 
  
              </div>) }

   
       
       {/* <MenuItem value={"006"}>006</MenuItem>
       <MenuItem value={"008"}>008</MenuItem>
       <MenuItem value={"002"}>002</MenuItem> */}
       <div className=" grid grid-cols-1p-4 w-full h-fit mt-6  place-items-center">

   {/* { token?.section.sections.map((x,i)=>{
            return(

                <div  key={i} >
                
       <button className='btn btn-square w-32  ' onClick={handleSectionChange} value={x}>Section {x}</button>


                </div>
            )
        })} */}
        <FormControl sx={{ m: 1, minWidth: 200}}>
        <InputLabel id="demo-simple-select-autowidth-label">Sections</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleSectionChange}
          value=""
          autoWidth
          label="Age"
        >
          <MenuItem value={"008"}>Section 008</MenuItem>
          <MenuItem value={"007"}>Section 007</MenuItem>
          <MenuItem value={"006"}>Section 006</MenuItem>
        </Select>
      </FormControl>

        
   </div>

        <div className="grid   p-4 gap-4 lg:grid-cols-3 xl:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 row-span-2 md:gap-4 sm:gap-4 h-fit  place-items-center">
   

{fetchTest?.test&&
  fetchTest?.test.map((value,i)=>{
         
         return(
           <TeacherCard key={value?.test_id} test_name ={value?.tes_t?.test_name}  test_id = {value?.test_id} getButtonId={getButtonId} />

         )
       })
     }
</div>
       
      








    </div>
  )
}

export default Teacher