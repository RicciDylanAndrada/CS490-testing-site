import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function Questions() {
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
                                                    <form className="h-full" >
                                {/* get test data and loop creating div of things below */}
                                        <div class="grid w-full  p-4  h-full ">
                                    
                                
                                        <TextField
          id="outlined-password-input"
          label="Question"
          type="question"
          autoComplete="current-password"
        />
                                
                                        <div class=" w-full  grid  place-items-center  row-start-6   ">
                                        <button class="place-self-center w btn btn-active   " >Add Question </button>
                                        </div> 
                                    
                                
                                        </div>
                                    
                                        </form>
                        </div>

                        <div class="
                        "></div>
    
            
            </div> 
            
    
            
            </div>
       
    
        </div>
      )
}

export default Questions