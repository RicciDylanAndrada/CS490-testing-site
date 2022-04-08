import React from 'react'
import { Link } from 'react-router-dom'
function Card({test_name,getButtonId,test_id}) {
   
  return (
    
    <div className=" p-4 w-80 grid h-44  card shadow-xl  side bg-white ">
           {test_name && (

           <div class="">
           <h1 className="   "  >Test: <p>{test_name}</p></h1>
            <button  onClick={getButtonId} id={test_id} 
            className='  btn btn-sm bg-info-content border-0   w-20  h-4  justify-self-center '  ><Link to="/student" >Enter</Link>
</button>

           </div>

           )}
           
           </div>
    

  )
}

export default Card