import {Link} from 'react-router-dom' 
import {useContext} from 'react'

import LoginContext from '../../content/LoginContext'

export default function Navbar() {
    const{setToken}=useContext(LoginContext)
    const handleLogout=()=>{
        setToken("")
        window.localStorage.removeItem("token")
      }   
    return (
        
        <div className="navbar  w-full  bg-neutral text-neutral-content">
        <div className="container mx-auto">
            <div className="flex-none px-2 mx-2">
                <Link to="/" className=" text-md font-bold align-middle">
                    Test Taker
                </Link>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="flex justify-end">
                    <Link to="/" className="btn text-md btn-ghost btn-sm rounded-btn">
                        Log In
                    </Link>
                    
                </div>

            </div>
        </div>
        <div className="justify-self-end ">
            <button onClick ={handleLogout} className="btn btn-sm btn-success h-30">Logout</button>
            </div>
        </div>
        
    )
}