import React from 'react'
//get set login from here
import  img from  "./images/free3.jpeg"
function LoginForm() {
  return (
    <div className=' w-full h-full col ' >
<div class="grid grid-cols-2 h-full">
<div class="bg-sky-200 grid   p-4  place-items-center">
        <img className='rounded-full  ' src={ img} ></img>
    </div>
    
    <div class="bg-white text-black grid place-items-center "> 
    <div class="w-4/6 h-3/6 rounded shadow-md drop-shadow-lg p-3 ">
        <form className=' h-full'>
            <h1 className='text-black text-2xl ' >Login</h1>
            <div class="grid grid-cols-1 place-items-center  h-full">
            <label  >
            <p className='justify-self-start' ></p>
            Username
            <input className='border-2 w-5/6 border-sky-200'></input>
            </label>
               <label>
               Password
               <input className='border-2  w-5/6 border-sky-200'></input>

               </label>
                <button className='btn  w-3/6 h-3 ' >Enter</button>
            </div>
            
        </form>
    </div>
        
    </div>
    
</div>

    </div>
    
    
  )
}

export default LoginForm