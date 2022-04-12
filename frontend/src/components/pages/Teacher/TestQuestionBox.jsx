import React from 'react'

function TestQuestionBox({val}) {
  console.log(val)
  return (

    <div  class=" h-full bg-white  ">

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
      
         <div className="row-span-4 text-center border-2 rounded-md  h-3/4  overflow-auto ">

<textarea    readOnly defaultValue={value.answer}  name={value.question_id}    className= "p-2  bg-gray-200 text-black  w-full h-full rounded-md" ></textarea>
</div>
     </div>)
   })
      )}
    </div>
 
 )
}

export default TestQuestionBox