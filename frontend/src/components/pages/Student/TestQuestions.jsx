import React from 'react'
import * as indentation from 'indent-textarea';
import {useEffect} from 'react'
import { AutoTabProvider } from 'react-auto-tab'

function TestQuestions({val,handleInputChange,keyHandler,studentSub}) {

  // useEffect(()=>{
  //   const textarea = document.querySelector('textarea');
  // indentation.watch(textarea);
  // },[])
  console.log(studentSub?.answers?.[1])
  return (

     <div  class=" h-full  ">

       { val && (
        val?.map((value,index)=>{
      return(
       <div key={value.question_id} className='border-2 w-full shadow-xl  h-full grid-rows-2  p-2 grid ' > 
       
 
         <div class="w-full grid-rows-2  place-items-center grid">
          
 <div className='w-full grid grid-cols-2 place-items-center' >
 <div className='grid place-items-start w-full p-4' >
 <div class="grid place-items-center">

 <h1 className="text-lg font-bold" >  Category:</h1>
 <h1 className='font-light  ' >{value.question.category}</h1>
 </div>

 </div>
 
 <div className='grid place-items-end text-center  w-full p-4'>
 <div class="grid place-items-center">
 <h1 className="text-lg font-bold" >  Points:</h1>
 <h1 className='font-light  ' > {value.points}</h1>
 </div>

 
 </div>
 </div>
 <div className="w-full grid text-center">
 <h1>{value.question.question}</h1>
 
 </div>       
       </div>
       
          
 
 
          <div className="row-span-4 text-center border-2 overflow-auto ">
          <AutoTabProvider>
 
 <textarea  onKeyDown={(e)=>keyHandler(e)} required  value={studentSub?.answers?.[value.question_id]}  name={value.question_id}    onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-full rounded-md" ></textarea>
 </AutoTabProvider>
 </div>
      </div>)
    })
       )}
     </div>
  
  )
}

export default TestQuestions