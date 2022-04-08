import React from 'react'

function DisplayTest({getButtonId,value}) {
  return (
    <div className=" p-4 w-full grid h-44  card shadow-xl  side bg-white ">
    {value?.tes_t.test_name && (


    <div class=" grid place-items-center">
    <h1 className=" text-lg font-bold    "  ><p>{value.tes_t.test_name}</p></h1>
    <h1 className="  text-sm font-light     "  ><p>{value.tes_t.section}</p></h1>
    <h1 className="   "  ><p>{value.test_it}</p></h1>


     <button  onClick={getButtonId} id={value.test_id} 
     className='  btn btn-sm bg-info-content
 border-0   text-xs  w-24  h-4  justify-self-center '  >Take Test</button>

    </div>

    )}
    
    </div>


  )
}

export default DisplayTest