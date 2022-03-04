import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'


import { useEffect,useState } from 'react';
function Questions() {

    const[added,setAdded]=useState("")

    const[fetchQuestion,setFetchQuestion]=useState("")

    const[question,setQuestion]=useState("")
    function handleChange(e) { 
        setQuestion(e.target.value) 
        console.log(e.target.value)
    }

    useEffect(()=>{

        axios({
            method: "GET",
            url:"/question"
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
        axios({
          method: "POST",
          url:"/add_question",
          data:{
            question: question,
           }
        })
        .then((response) => {
          console.log(response)
          console.log("send question")

        
    
    
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    
        setQuestion("")
        setAdded(" ")
        console.log(question)
    
          
    
        event.preventDefault()
      }

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
              {/* able to delete queston tabs or add tes question tabs */}
            
            </div> 
            
            
            
            
            
            <div className=" w-full  row-span-5  grid grid-cols-2   ">
           
                        <div class=" border-r-2 ">
                        <form  className="h-full" onSubmit={onSubmit}>
                                {/* get test data and loop creating div of things below */}
                                        <div class="grid w-full  p-4  h-full ">
                                    

                                        <TextField
          id="outlined-password-input"
          label="Question"
          type="question"
          value={question}
          onChange={handleChange}
          autoComplete="current-password"
        />
                                

                                        <button type="submit" class="place-self-center w btn btn-active   " >Add Question </button>

                                    
                                
                                        </div>
                                    
                                        </form>
                        </div>

                        <div class="p-4 flex  flex-col  space-y-4  ">
                {fetchQuestion && fetchQuestion?.question.map((question) => {
                    return (
                            <div className='border-2 rounded-xl h-12' > 
                            <h1>  {question.question} </h1>
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