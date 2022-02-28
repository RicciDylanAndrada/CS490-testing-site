import React from 'react'
import data from "../data/test.json"
function Student() {

  //fetch the test acconuts
  // would also have to check for section ID to display the certain test
  const questions = data.tests.map((test)=>{
    if (test.section_id==1){
      return test?.Questions
    }
  })
  
  return (
    <div className='h-screen text-black bg-gray-100  place-items-center  w-full  grid grid-rows-6 '>
    <div class=" row-span-1  grid place-items-center bg-gradient-to-tr from-red-700 to-red-100  w-full h-full">
        
    </div>
    <div class="w-11/12  h-5/6 relative bottom-10 row-span-2 bg-white shadow-xl grid grid-cols-1 place-content-start text-center rounded-md ">

        <div class="border-b-2 w-full grid  border-b-gray-    y p-2 ">
          <h2 class="justify-self-start" >Completed Tests</h2>
        </div> 
        </div>
   

       {data?.tests &&
       data.tests.map((value)=>{
         {/* let key = Object.keys(value.Questions)
        key.forEach((key,index) =>{
          return (        
          console.log(value.Questions[index])
          )
          

        }) */}
         return(
        

         <div key={value.test_id}>
         <p>Section id: {value.section_id}</p>



         </div>
         )
       })
     }
      








    </div>
  )
}

export default Student