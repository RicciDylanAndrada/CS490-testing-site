import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect,useState } from 'react';
function Questions() {
  const [difficulty, setDifficulty] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [functionName, setFunctionName] = React.useState('');

  const [matrix, setMatrix] = useState(
    Array.from({ length: 1 }, () => Array.from({ length: 2 }, () => null))
  );
    const[added,setAdded]=useState("")

    const[fetchQuestion,setFetchQuestion]=useState("")
    const[submit,setSubmit]=useState(false)
    const[question1,setQuestion]=useState("")
    const[newQuestion,setNewQuestion]=useState()

    const handleFunctionChange = (event) => {
      setFunctionName(event.target.value);
    };
    const handleDifficultyChange = (event) => {
      setDifficulty(event.target.value);
    }; const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
    function handleChange(e) { 
        setQuestion(e.target.value) 
       // console.log(e.target.value)
    }
    const handleRemoveClick = index => {
    const list = [...matrix];
    list.splice(index, 1);
    setMatrix(list);
  };
  const handleAddClick = () => {
    setMatrix([
      ...matrix,
      Array.from({ length: 2 }, () => Array.from({ length: 1 }, () => null))
    ]);
  };
  const handleMatrixChange = (row, column, event) => {
    let copy = [...matrix];
    copy[row][column] = +event.target.value;
    setMatrix(copy);

  };
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    useEffect(()=>{

        axios({
            method: "GET",
            url:"/question",
            
          })
          .then((response) => {
            console.log(response.data)
            setFetchQuestion(response.data)
          
      
      
          }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })
      

    },[added])

    function onSubmit(event) {
      event.preventDefault()
console.log(newQuestion)
let newa = newArray(question1,category,difficulty,matrix,functionName)
console.log(newa)
change(newa)
  
      }

      const  newArray =(question1,category,difficulty,matrix,functionName)=>{


        let x ={
          question1:question1,
            category:category,
            difficulty:difficulty,
            test_cases:matrix,
            function_name:functionName,
        }
        setNewQuestion(x)

        
          

          return x
        }
      const change = (x)=>{
        console.log(x)
        axios({
          method: "POST",
          url:"/add_question",
          data:{
            question1: x,
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
        setAdded(" ")
       setNewQuestion({

        question1:"",
        difficulty:"",
        test_cases:[]    , 
           matrix:[],

  
        category:""
 
       })
       setSubmit(false)
      }
      // console.log(fetchQuestion.question.map((x)=>{
      //   return(x.question)
      // }))
      
         console.log(fetchQuestion)  
    return (


    
        <div className='h-screen text-black bg-gray-100  place-items-center   grid grid-rows-6   '>
            {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
            {/* <Link to="test">Favorite hobby link</Link>
            <button onClick={() => navigate("test")}>Go forward</button>
          <button onClick={() => navigate(-1)}>Go back</button> */}
          
        <div class=" row-span-1 grid place-items-center bg-gradient-to-r from-red-700 to-blue-300   w-full h-full">
            
        </div>
        <div class="w-11/12  h-full relative  md:bottom-12 lg:bottom-20 row-span-5 bg-white shadow-xl grid grid-rows-6 1 text-center ">
    
            <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
              <h1 class="justify-self-center place-self-center  text-lg " > Question Box</h1>
    
              {/* Vertical tab for test questions and inside a form  */}
              {/* able to delete queston tabs or add tes question1 tabs */}
            
            </div> 
            
            
            
            
            
            <div className=" w-full  row-span-5  grid grid-cols-2   ">
           
                        <div class=" border-r-2 ">
                        <form  className="h-full w-full " onSubmit={onSubmit}>
                                {/* get test data and loop creating div of things below */}
                                        <div class="grid  md:w-72  p-4  h-full ">
                                    

                                        <TextField
          id="outlined-password-input"
          label="Question"
          type="question1"
          value={question1}
          className="w-full"
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <TextField
        required
          id="outlined-password-input"
          label="Function Name"
          type="Function Name"
          value={functionName}
          onChange={handleFunctionChange}
          autoComplete="current-password"
        />
        <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
        required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={difficulty}
          label="Difficulty"
          onChange={handleDifficultyChange}
        >
          <MenuItem value={'Easy'}>Easy</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'Hard'}>Hard</MenuItem>
        </Select>
      </FormControl>


      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
        required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={'Chapter 4'}>Chapter 1</MenuItem>
          <MenuItem value={'Chapter 3' }>Chapter2</MenuItem>
          <MenuItem value={'Chapter 5'}>Chapter 3 </MenuItem>
        </Select>
      </FormControl>
    </Box>
    <table  >
    
        <tbody className="" >
        <tr>
        <td>
        <h1>Input Test Case</h1>

        </td>
        <td>
        <h1>Output Test Case</h1>

        </td>
        </tr>
          {matrix.map((row, rowIndex) => (
            <tr className="fkex flex-row " key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td  className="" key={columnIndex}>
                  <input
                  className="border-2"
                  required
                  type='number'
                    onChange={(e) => handleMatrixChange(rowIndex, columnIndex, e)}
                  />
                </td>
              ))}
              {matrix.length !== 1 && <button
                className="mr10 grid place-items-center justify-center " 
                onClick={() => handleRemoveClick(rowIndex)}>Remove</button>}
                
              {matrix.length - 1 === rowIndex && <div className='h-full grid place-content-center' ><button className='h-full' onClick={handleAddClick}>Add</button></div>}
            </tr>
          ))}
        </tbody>
      </table>   

                                        <button type="submit" class="place-self-center w btn btn-active   " >Add Question </button>

                                    
                                
                                        </div>
                                    
                                        </form>
                        </div>

                        <div class="p-4 flex  flex-col  overflow-auto space-y-4  ">

                {fetchQuestion?.question && fetchQuestion?.question.map((value)=>{
                    return (
                            <div className='border-2 rounded-xl h-12' > 
                            <h1>  {value.question.question} </h1>
                      </div>
                    )

                } )}
                


                        </div>
    
            
            </div> 
            
    
            
            </div>
       
    
        </div>
      )
}

export default Questions