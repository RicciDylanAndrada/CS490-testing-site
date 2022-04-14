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
  const [restraint, setRestraint] = React.useState('');
  const[filterdCategory,setFilteredCategory]=useState("")
  const[filterdKeyword,setFilteredKeyword]=useState("")
  const[filterdDifficulty,setFilteredDifficulty]=useState("")
  const [functionName, setFunctionName] = React.useState('');

  const [matrix, setMatrix] = useState(
    Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => null))
  );

    const[fetchQuestion,setFetchQuestion]=useState("")
    const[submit,setSubmit]=useState(false)
    const[question,setQuestion]=useState("")
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
      

    },[submit])

    function onSubmit(event) {
      event.preventDefault()
let newa = newArray(question,category,difficulty,matrix,functionName,restraint)
change(newa)

  
      }

      const  newArray =(question,category,difficulty,matrix,functionName,restraint)=>{


        let x ={
          question:question,
            category:category,
            difficulty:difficulty,
            test_cases:matrix,
            function_name:functionName,
            restraint:restraint
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
            question: x,
           }
        })
        .then((response) => {
          setSubmit(!submit)

        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
       setNewQuestion({

        question:"",
        difficulty:"",
        test_cases:[]    , 
           matrix:[],

  
        category:"",
        restraint:""
 
       })
      }
     
      
    return (


    
        <div className='h-screen text-black bg-stone-50	 place-items-center   grid grid-rows-6   '>
            {/* {test?<h1>hello</h1>:<h1>no</h1>} */}
            {/* <Link to="test">Favorite hobby link</Link>
            <button onClick={() => navigate("test")}>Go forward</button>
          <button onClick={() => navigate(-1)}>Go back</button> */}
          
        <div className=" row-span-1 grid place-items-center bg-base-200   w-full h-full">
            
        </div>
        <div className="w-11/12  h-full relative  md:bottom-12 lg:bottom-20 row-span-5 bg-stone-50	 shadow-xl grid grid-rows-6 1 text-center ">
    
            <div className="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
              <h1 className="justify-self-center place-self-center  text-lg " > Question Box</h1>
    
              {/* Vertical tab for test questions and inside a form  */}
              {/* able to delete queston tabs or add tes question tabs */}
            
            </div> 
            
            
            
            
            
            <div className=" w-full  row-span-5  grid grid-cols-2    ">
           
                        <div className=" border-r-2 ">
                        <form  className="h-full w-full " onSubmit={onSubmit}>
                                {/* get test data and loop creating div of things below */}
                                        <div className="grid  w-full p-4 w-full  place-items-center  h-full ">
                                    

                                        <TextField
          id="outlined-password-input"
          label="Question"
          type="question"
          value={question}
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
          className="w-full"

          value={functionName}
          onChange={handleFunctionChange}
          autoComplete="current-password"
        />
        <Box sx={{ minWidth: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
        required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={difficulty}
          label="Difficulty"
          className="w-full"

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
          className="w-full"

          label="Category"
          onChange={handleCategoryChange}
        >
           <MenuItem value={"Function"}>Function</MenuItem>
          <MenuItem value={"While"}>While</MenuItem>
          <MenuItem value={"For"}>For</MenuItem>
          <MenuItem value={"Recursion"}>Recursion</MenuItem>
          <MenuItem value={"Fail"}>Fail</MenuItem>
        </Select>
      </FormControl>


      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Restraint</InputLabel>
        <Select
        required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={restraint}
          label="Restraint"
          className="w-full"

          onChange={e=>setRestraint(e.target.value)}
        >
           <MenuItem value={"recursive"}>Recursive</MenuItem>
          <MenuItem value={"while"}>While</MenuItem>
          <MenuItem value={"ror"}>For</MenuItem>
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
                    onChange={(e) => handleMatrixChange(rowIndex, columnIndex, e)}
                  />
                </td>
              ))}
              {matrix.length !== 2 && <button
                className="mr10 grid place-items-center justify-center " 
                onClick={() => handleRemoveClick(rowIndex)}>Remove</button>}
                
              {matrix.length - 1 === rowIndex && matrix.length <=4 && <div className='h-full grid place-content-center' ><button className='h-full' onClick={handleAddClick}>Add</button></div>}
            </tr>
          ))}
        </tbody>
      </table>   

                                        <button type="submit" className="place-self-center w btn btn-active   " >Add Question </button>

                                    
                                
                                        </div>
                                    
                                        </form>
                        </div>
        <div className="grid grid-rows-6 overflow-auto h-full border-b-2 place-items-center w-full border-r-2 ">
        <h1 className='m-2 row-span-1' >Question Bank </h1>

    <div class="grid grid-cols-3 w-full gap-2 pl-2 pr-2  row-span-1">
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
    <TextField  value={filterdKeyword} onChange={e=> setFilteredKeyword(e.target.value)} id="outlined-basic" label="Keyword" variant="outlined" />


    </div>

    <div className="p-4 flex  row-span-4 flex-col  w-full h-full overflow-auto space-y-4  ">

{fetchQuestion?.question && fetchQuestion?.question.filter((x)=>{
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
})
.map((value)=>{
    return (
            <div className='border-2 rounded-md h-24 shadow-md   grid place-items-center grid-rows-2' >
            <div className="grid grid-cols-3 w-full gap-2 place-items-center">
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


            </div> 
            <h1  >   {value.question?.question} </h1>
      </div>
    )

} )}



        </div>


    </div>
                        
    
            
            </div> 
            
    
            
            </div>
       
    
        </div>
      )
}

export default Questions