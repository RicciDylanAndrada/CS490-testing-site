import React from 'react'
import data from "../data/test.json"
import Card from '../shared/Card'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../content/LoginContext'
import { PathRouteProps } from 'react-router-dom'
import {BrowserRouter, BrowserRouter as Router,Route,Routes,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AllyProps from '../Tab/AllyProps'
import TabPanel from '../Tab/TabPanel'
import Box  from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

function Teacher() {
  const [tabValue,setTabValue]=useState(0);
  const [value,setValue]=useState({
    // student_id:null,
    // section:null,
    question_id:null, // from tab
    answer:null  // from input 
  });

  //fetch the test acconuts
  // would also have to check for section ID to display the certain test
  const navigate = useNavigate();

//  let getButtonId = (e) => {
//         console.log(e.currentTarget.id);
//         setTest(e.currentTarget.id)
//       }


const handleChangeTab = (event, newValue) => {
  setTabValue(newValue);
};
const handleChange = (event) => {
  const {value, name} = event.target
  setValue(prevNote => ({
      ...prevNote, [name]: value})
  )
};

const handleSubmit=(e)=>{
  e.preventDefault()


  const submission={
    // id:token.student_id
    question_id:e.value.question,
    answer:e.value.answer,


  }
  console.log(submission)
  
}

  return (


    
    <div className='h-full text-black bg-gray-100  place-items-center   grid grid-rows-6   '>
        {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
        {/* <Link to="test">Favorite hobby link</Link>
        <button onClick={() => navigate("test")}>Go forward</button>
      <button onClick={() => navigate(-1)}>Go back</button> */}
      
    <div class=" row-span-1 grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
        
    </div>
    <div class="w-11/12  h-5/6 relative  md:bottom-12 lg:bottom-32 row-span-2 bg-white shadow-xl grid grid-rows-6 1 text-center ">

        <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
          <h1 class="justify-self-center place-self-center  text-lg " > New Test</h1>

          {/* Vertical tab for test questions and inside a form  */}
          {/* able to delete queston tabs or add tes question tabs */}
        
        </div> 
        <div class="border-b-2 w-full   border-b-gray row-span-4  y  ">
        {/* get test data and loop creating div of things below */}
        <div class="grid w-full  grid-cols-2  h-full ">
        <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 298,
        width: "w-full",

        
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChangeTab}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Item One" {...AllyProps(0)} />
        <Tab label="Item Two" {...AllyProps(1)} />
        <Tab label="Item Three" {...AllyProps(2)} />
        <Tab label="Item Four" {...AllyProps(3)} />
        <Tab label="Item Five" {...AllyProps(4)} />
        <Tab label="Item Six" {...AllyProps(5)} />
        <Tab label="Item Seven" {...AllyProps(6)} />
      </Tabs>


      <TabPanel value={tabValue} index={0}>
      <input  className="border-2 border-black rounded-lg p-4" placeholder='question 1 '  />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
      <input placeholder='question 2'  />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
      <input placeholder='question 3 '  />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        Item Seven2
      </TabPanel>
    </Box>
        </div>

        
        </div> 
        <div class="border-b-2 w-full  grid  place-items-center  border-b-gray row-span-1  p-5 ">
          <button class="place-self-center w btn btn-active   " >Create Test </button>
        </div> 

        
        </div>
   



        <div class="grid  p-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 row-span-7 md:gap-4 sm:gap-4 h-full w-full place-items-center">

{/* DROPDOWN BOX FOR TEST IN SECTIONS*/}

{/* Be able to delete tests   inside teacher Card  */}
{data?.tests &&
       data?.tests.map((value)=>{
         {/* let key = Object.keys(value.Questions)
        key.forEach((key,index) =>{
          return (        
          console.log(value.Questions[index])
          )
          

        }) */}
         return(
           <Card test_id={value.test_name} />

        




         
         )
       })
     }
</div>
       
      








    </div>
  )
}

export default Teacher