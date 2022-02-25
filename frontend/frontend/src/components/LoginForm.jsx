import React from 'react'
//get set login from here
import  img from  "./images/free3.jpeg"
import {useState,useContext} from 'react'
import { LoginProvider } from '../content/LoginContext'



function LoginForm({date}) {

  const[loginForm,setLoginForm]=useState(
    {
    username:"",
    password:""

  }
  )

  const{setToken,setUser,token}=useContext(LoginProvider)


  const logIn = async (e) =>{
    try{
        const user = await fetch("/token",{
          cache: "no-cache",

             method:'POST',
             headers:{
              "content-type": "application/json",

                  Authorization:`Bearer ${token}`,
                       }, 
            body: loginForm
                              
                   })

                       const response= await user.json()
                       setToken(response.data.access_token)
                       setUser(response.data.user)

                       

               }
               catch(err){
       console.log(err)
       console.log(err.response)
       console.log(err.response.status)

       
               }
               setLoginForm(({
                email: "",
                password: ""}))
        
              e.preventDefault()
}

function handleChange(event) { 
  const {value, name} = event.target
  setLoginForm(prevNote => ({
      ...prevNote, [name]: value})
  )}
  return (

    <div className=' w-full h-full col ' >
   
<div className="grid grid-cols-2 h-full">
<div className="bg-sky-200 grid   p-4  place-items-center">
        <img className='rounded-full  ' src={ img} ></img>
    </div>
    
    <div className="bg-white text-black grid place-items-center "> 
    <div className="w-4/6 h-3/6 rounded shadow-md drop-shadow-lg p-3 ">
    <p>Profile name: {date?.profile_name}</p>
              <p>About me: {date.about_me}</p>
        <form className=' h-full'>
        
            <h1 className='text-black text-2xl ' >Login</h1>
            <div className="grid grid-cols-1 place-items-center  h-full">
                    <label  >
                    <p className='justify-self-start' ></p>
                    Username
                    <input onChange={handleChange} type="username" text={loginForm.username} value ={loginForm.username} name="username" className='border-2 w-5/6 border-sky-200'></input>
                    </label>
                    <label>
                    Password
                    <input  onChange={handleChange} type="password"  text={loginForm.password} value ={loginForm.password} name="password" className='border-2  w-5/6 border-sky-200'></input>

                    </label>
                        <button className='btn  w-3/6 h-3 ' onSubmit={logIn} >Enter</button>
            </div>
            
        </form>
    </div>
        
    </div>
    
</div>

    </div>
    
    
  )
}

export default LoginForm