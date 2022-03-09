import React from 'react'

function StudentSubmissionCard({test_name,getButtonId1,test_id}) {
    return (
    
        <div className=" p-4 w-80 grid h-44  card shadow-xl  side bg-white ">
               {test_name && (
    
               <div  class="grid place-items-center">
               <h1>
               <p>{test_name}</p>
               </h1>

                <button  onClick={getButtonId1} id={test_id} 
                className='  btn btn-sm bg-blue-500 border-0   w-20  h-4  justify-self-center '  >Enter</button>
    
               </div>
    
               )}
               
               </div>
    
      )
    
}

export default StudentSubmissionCard