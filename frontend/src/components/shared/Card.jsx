import React from 'react'

function Card({test_id}) {
  return (
    
    <div >
        
    <div className="p-4 card  shadow-xl compact side bg-base-100">
        <h1 className="flex justify-center mb-4 text-2xl font-bold "  > {test_id}</h1>
       
        <div className=" w-80 grid grid-cols-2 mx-auto">
        <div className="grid  justify-start">
            <p className="text-lg font-bold">Followers</p>
        </div>
        <div className="grid  justify-end w-full ">



        </div>
        </div>
    </div>
    
</div>

    

  )
}

export default Card