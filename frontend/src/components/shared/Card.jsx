import React from 'react'

function Card({test_id,getButtonId}) {
   
  return (
    
    <div className=" p-4 w-80 grid h-44  card shadow-xl  side bg-white ">
            
            <h1 className="   "  >Test: <p>{test_id}</p></h1>
            <button  onClick={getButtonId} id={test_id} 
            className='  btn btn-sm bg-blue-500 border-0   w-20  h-4  justify-self-center '  >Enter</button>

            </div>
    

  )
}

export default Card