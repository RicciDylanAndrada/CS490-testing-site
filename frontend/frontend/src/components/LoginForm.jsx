import React from 'react'
//get set login from here
import {useState,useContext} from 'react'
import LoginContext from "../content/LoginContext"



function LoginForm({date}) {

  const[loginForm,setLoginForm]=useState(
    {
    username:"",
    password:""

  }
  )

  const{setToken,setUser,token}=useContext(LoginContext)


  const logIn = async (e) =>{
    e.preventDfault()

    console.log("fire")

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
        
}

function handleChange(event) { 
  const {value, name} = event.target
  setLoginForm(prevNote => ({
      ...prevNote, [name]: value})
  )}

  return (

    <div className=' w-full h-full col ' >

<div className="grid grid-cols-1 h-full">


    <div className="bg-hero-pattern bg-no-repeat  bg-cover rounded-xl grid  text-black grid place-items-center "> 
    
    <div className="w-2/6 h-2/6  bg-white   rounded-3xl  shadow-md drop-shadow-2xl  p-3  text-center">
    
        <form className=' h-full'>

            <h1 className='text-black text-2xl justify-self-center ' >Login</h1>
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