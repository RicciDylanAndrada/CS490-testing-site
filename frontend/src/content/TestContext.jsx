import {createContext,useState} from 'react'
import { useEffect,useContext } from 'react'
import LoginContext from './LoginContext'
import axios from 'axios'
const TestContext =createContext()


export const TestProvider=({children})=>{
    const {token}  = useContext(LoginContext)
    const[inTest,setInTests]=useState(false)
    const [ student,setStudent]=useState(null)
    const [ teacher,setTeacher]=useState(null)
    const [ user,setUser]=useState("")
    const [selectedTest,setSelectedTest]=useState(null)
    const[fetchTest,setFetchTest]=useState("")
    const[studentTest,setStudentTest]=useState("")
    const [testWindow,setTestWindow]=useState(false)
    const[toggle,setToggle]=useState()

const sec = token.section
    useEffect(()=>{


        axios({
          method: "POST",
          url:"/show_test",
          data:{
            section: sec,
           }
        })
        .then((response) => {
          console.log("this is the test")
          console.log(response.data)
          setFetchTest(response.data)
          
    
    
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    
  
  },[token])
  const togglePopup=()=>{
    setInTests(!inTest)
  }
  
  return(
    
    <TestContext.Provider
     value={{
       fetchTest,
       selectedTest,
       setSelectedTest,
       studentTest,
       inTest,
       togglePopup,
       setTestWindow,
       testWindow


       
       }}>
        {children}
    </TestContext.Provider>
)
  }
  export default TestContext