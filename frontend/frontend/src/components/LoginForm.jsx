import React from 'react'
import axios from 'axios'
//get set login from here
import {useState,useContext} from 'react'
import LoginContext from "../content/LoginContext"
import {Link, useNavigate,useLocation} from 'react-router-dom'


function LoginForm({date}) {


  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const[loginForm,setLoginForm]=useState(
    {
    username:"",
    password:""

  }
  )

  const{setToken,setUser,token}=useContext(LoginContext)


  function logMeIn(event) {
    console.log("submmitig om fgimctopm ")
    axios({
      method: "POST",
      url:"/token",
      data:{
        username: loginForm.username,
        password: loginForm.password
       }
    })
    .then((response) => {
      setToken({token:response.data.access_token})
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    setLoginForm(({
      email: "",
      password: ""})) 
      navigate('/student')

    event.preventDefault()
  }

function handleChange(event) { 
  const {value, name} = event.target
  setLoginForm(prevNote => ({
      ...prevNote, [name]: value})
  )}
  console.log("submmitig")

  return (

    <div className=' w-full h-full col ' >

<div className="grid grid-cols-1 h-full">


    <div className="bg-hero-pattern bg-no-repeat  bg-cover rounded-xl   text-black grid place-items-center "> 
    
    <div className="w-2/6 h-2/6  bg-white   rounded-3xl  shadow-md drop-shadow-2xl  p-3  text-center">
    
        <form className=' h-full' onSubmit={logMeIn}>

            <h1 className='text-black text-2xl justify-self-center ' >Login</h1>
            <div className="grid grid-cols-1 place-items-center  h-full">
                    <label  >
                    <p className='justify-self-start' ></p>
                    Username
                    <input onChange={handleChange} type="username" value ={loginForm.username || ''} name="username" className='border-2 w-5/6 border-sky-200'></input>
                    </label>
                    <label>
                    Password
                    <input  onChange={handleChange} type="password"  t value ={loginForm.password || ''} name="password" className='border-2  w-5/6 border-sky-200'></input>

                    </label>
                        <button className='btn  w-3/6 h-3 ' type='submit' >Enter</button>
            </div>

        </form>
    </div>
        
    </div>
    
</div>

    </div>
    
    
  )
}

export default LoginForm