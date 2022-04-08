// import React from 'react'

function TeacherCard({test_name,getButtonId,test_id,key}) {
  return (
    
    <div key={test_id} className=" p-4 w-64  grid h-44  card shadow-xl  side bg-white ">
           {test_name && (

           <div  class="grid place-items-center">
           <h1><p>{test_name}</p></h1>
            <button  onClick={getButtonId} id={test_id} 
            className='  btn btn-sm bg-info-content border-0   w-20  h-4  justify-self-center '  >Enter</button>

           </div>

           )}
           
           </div>

  )
}

export default TeacherCard


// tes_t.map((value)=>{
//     {/* let key = Object.keys(value.Questions)
//    key.forEach((key,index) =>{
//      return (        
//      console.log(value.Questions[index])
//      )
     

//    }) */}
//     return(
//         <h1>{value.test_name}</h1>

    
//     )
//   }