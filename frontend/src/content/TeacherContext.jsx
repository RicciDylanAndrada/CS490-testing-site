import {createContext,useState} from 'react'
import { useEffect,useContext } from 'react'
import LoginContext from './LoginContext'
import axios from 'axios'
const TeacherContext =createContext()


export const TeacherProvider=({children})=>{
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
    const [filterSubmissionTest,setFilterSubmissionTest]=useState(false)
    const[fetchSubmission,setfetchSubmission]=useState([])
    const [section, setsection] = useState('');
    const [studentID,setStudentID]=useState("")


const sec = token.section
useEffect(()=>{

    axios({
      method: "POST",
      url:"/show_test",
      data:{
        section: section,
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
      axios({
        method: "POST",
        url:"/show_submission_student",
        data:{
          section: section,
          username:token?.username,
          status:1,
  
          
         }
      })
      .then((response) => {
        console.log("this is the test")
        console.log(response.data)
        setfetchSubmission(response.data)
        
  
  
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
  
  
  },[section,selectedTest,filterSubmissionTest,studentID])
  const togglePopup=()=>{
    setInTests(!inTest)
  }
  const setFilter = (filtersubmissionTest) =>{
    setFilterSubmissionTest(filtersubmissionTest)
  }
  
  return(
    
    <TeacherContext.Provider
     value={{
       fetchTest,
       selectedTest,
       setStudentID,
       setSelectedTest,
       studentTest,
       inTest,
       togglePopup,
       setsection,
       section,
       setTestWindow,
       testWindow,
       fetchSubmission,
       setfetchSubmission,
       filterSubmissionTest,
       setFilterSubmissionTest,
       setFilter,
       studentID
    


       
       }}>
        {children}
    </TeacherContext.Provider>
)
  }
  export default TeacherContext