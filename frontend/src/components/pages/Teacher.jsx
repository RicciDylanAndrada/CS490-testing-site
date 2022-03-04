import React from 'react'
import data from "../data/test.json"
import Card from '../shared/Card'
import axios from 'axios'
import { useState,useEffect } from 'react'
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
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';




function Teacher() {
  const [tabValue,setTabValue]=useState(0);
  const[fetchQuestion,setFetchQuestion]=useState("null")



  useEffect(()=>{

    axios({
        method: "GET",
        url:"/question"
      })
      .then((response) => {
        console.log(response.data)
        setFetchQuestion(response.data)
        setRight(response.data.question)
  
  
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
  

},[])

  const [value,setValue]=useState({
    // student_id:null,
    // section:null,
    question_id:null, // from tab
    answer:null  // from input 
  });

  //fetch the test acconuts
  // would also have to check for section ID to display the certain test
  const navigate = useNavigate();


  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = useState(fetchQuestion?.question);

    // have to set right use state the array of question_id

  //const [right, setRight] = React.useState(fetchQuestion.question);

console.log(fetchQuestion.question)
console.log(right)

//  let getButtonId = (e) => {
//         console.log(e.currentTarget.id);
//         setTest(e.currentTarget.id)
//       }
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
};
const handleCheckedRight = () => {
  setRight(right.concat(leftChecked));
  setLeft(not(left, leftChecked));
  setChecked(not(checked, leftChecked));
};


const handleAllLeft = () => {
  setLeft(left.concat(right));
  setRight([]);
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
            <ListItemText id={labelId} primary={value.question} />
          </ListItem>
          </div>
        );
      })}
      <ListItem />
      
  </div>
);






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


  console.log(left)
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
        <div class=" w-full  row-span-4    ">
        {fetchQuestion && right && ( 
        <form onSubmit={handleSubmit} >
        <h1>HELLO</h1>       

 {/* get test data and loop creating div of things below */}
        <div class="grid w-full  grid-cols-1  h-full ">
        {/* <Box
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


    </Box> */}
    <div class="grid grid-cols-3">

    <div class="grid place-items-center">
    <h1>Test Questions </h1>


    <div class=" place-items-center h-80  overflow-auto       ">
      <Grid
        
      item>{customList(left)}</Grid>
      </div>


    </div>
   
      <div class="  place-items-center grid ">
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            All ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Selected &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            Selected &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪ All
          </Button>
        </Grid>
      </Grid>
     </div>
     <div class="grid place-items-center">
    <h1> Question Bank </h1>


    <div class=" place-items-center h-80    overflow-auto ">
<div className='h-full flex flex-col space-y-4' >
{customList(right)}

</div>

    
      </div>


    </div>


</div>        </div>
        <div class=" w-full  grid  place-items-center    p-5 ">
          <button type='"submit' class="place-self-center w btn btn-active   " >Create Test </button>
        </div> 
        </form>
        )}
        
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