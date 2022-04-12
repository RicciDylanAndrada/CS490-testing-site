import React from 'react'
import { Link } from 'react-router-dom'
function SubmissionCard({test_name,getButtonId1,student_id}) {
    return (
    
        <div className=" p-4 w-80 grid h-44  card shadow-xl  side bg-white ">
               {test_name && (
    
               <div  class="grid place-items-center">
               <h1>
               <p>{test_name}</p>
               </h1>
               <p>{student_id}</p>

                <button  onClick={getButtonId1} id={student_id} 
                // className='  btn btn-sm bg-info-content0 border-0   w-20  h-4  justify-self-center '  ><Link to="/grade" >AutoGrade</Link></button>
                className='  btn btn-sm bg-info-content0 border-0   w-20  h-4  justify-self-center '  >AutoGrade</button>

    
               </div>
    
               )}
               
               </div>
    
      )
    
}

export default SubmissionCard