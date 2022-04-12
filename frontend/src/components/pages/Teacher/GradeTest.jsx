import React from 'react'
import {useContext,useState} from 'react'
import TeacherContext from '../../../content/TeacherContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TeacherPagnate from './TeacherPagnate'
function GradeTest() {

    const {autoGraded,studentID,selectedTest,temp,setTemp,fetchTest,setTest,setfetchSubmission,fetchSubmission,setTestWindow,testWindow,togglePopup,inTest,filterSubmissionTest}=useContext(TeacherContext)
    //const[autoGraded,setAutograded]=useState()

      console.log(autoGraded)
    let studenttest1 = (fetchSubmission?.submissions?.filter((x)=>{
      return(
        x?.submission?.map((y)=>{
          return(y.test_id==selectedTest)
        })
      )
    }))
   
        function keyHandler(e) {
            var TABKEY = 9;
            if(e.target.keyCode == TABKEY) {
                e.target.value += "\t";
                if(e.preventDefault) {
                    e.preventDefault();
                }
            }
        }
    
//     const callAutoGrade=()=>{
//       console.log(selectedTest)
//       let studenttest1 = (fetchSubmission?.submissions?.filter((x)=>{
//         return(
//           x?.submission?.some((y)=>{
//             return(y.test_id==selectedTest && y.tes_t.user_id ==studentID)
//           })
//         )
//       }))
//       console.log("hi")
//       console.log(studenttest1)


//  axios({
//         method: "POST",
//         url:"/autograde",
//         data:{
//           submission:studenttest1

//          }
//       })
//       .then((response) => {
//         console.log(response.data)
//         setAutograded(response.data)
    
//         console.log("returned")
//       }).catch((error) => {
//         if (error.response) {
//           console.log(error.response)
//           console.log(error.response.status)
//           console.log(error.response.headers)
//           }
//       })
//       setTemp(autoGraded)
     
//     }
    
    const studentTest = autoGraded

    
    
    
    const handleRestraintChange = (evt, id) => {
      console.log(studentTest)

      console.log(temp)
      var result = [...studentTest];
   
        result =  result?.[0].submission?.map((x,index)=>{
          return(
            x.tes_t?.questions.map((y,idex)=>{

                 if(idex === id){
                   y.question.grade[evt.target.name] = evt.target.value
                   return y
                 }
                 else{
                   return y
                 }
                     
                  
              
             
            })

      )
            
           
          })

      setTemp(result);
      
      console.log(result)

    };
    const handleInputChange = (evt, q,id) => {
   
      var result = [...studentTest];
   
        result =  result?.[0].submission?.map((x,index)=>{
          return(
            x.tes_t?.questions.map((y,idex)=>{
                    
                    if (idex===q){
                      y.question.grade.test_cases.map((y,index)=>{
                        if(index === id){
                          y[evt.target.name] = evt.target.value
                          return y
                        }
                        else{
                          return y
                        }
                      })
                    }
                    
                  
              
             
            })

      )
            
           
          })

      setTemp(result);
      
      console.log(result)

    };
    const handleSubmit=(e)=>{
    
      console.log(temp)
      e.preventDefault()
      
console.log(temp)
      if(temp){
        autoGraded.map((x)=>{
          return(
            x.submission.map((y)=>{
              return(y.tes_t.question=temp)
            })
          )
        })
        autoGraded?.[0]?.submission?.[0]?.tes_t?.questions.map((value)=>{
            let sum=0;
            let test=0;
            value.question.grade.test_cases.map((x)=>{
              test+= Number(x.points)
            })
            
            sum=Number(Number(value.question.grade.restraint) + Number(value.question.grade.name_correct)) + test
            value.question.points=sum
        })
        console.log(autoGraded)
        
        axios({
          method: "POST",
          url:"/submission_update",
          data: (autoGraded[0]),
           
        })
        .then((response) => {
      
          console.log("returned")
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
      }
      else{
        axios({
          method: "POST",
          url:"/submission_update",
          data:(autoGraded[0]),
           
        })
        .then((response) => {
          console.log(autoGraded)
      
          console.log("returned")
        }).catch((error) => {
          if (error.response) {

            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
      }
    
     setTemp([])
    }


    
    // const newArray=(x,questionArray)=>{
    //   let arrayC = [];
    //   console.log(x)
    //   let flatArray = (questionArray.flat())
    
    //   flatArray.forEach(function(element){
    //   arrayC.push({
    //   question:element.question,
    //   question:{
    //     category:element.question.category,
    //     difficulty:element.question.difficulty,
    //     function_name:element.question.function_name,
    //     grade:{
    //       grade:x.find(e=>e.id==element.question_id)?.grade

    //     }
    //   },

    //   question_id:element.question_id,
    //   points:element.points,
    
    //   answer:x.find(e=>e.id==element.question_id)?.answer
    //   });  
    // });
    
    
    
    
    // studenttest1.map((x)=>{
    //   return(
    //     x.tes_t.questions=arrayC
    
    
    //   )
    // })
    // //console.log(studenttest1)
    // return (studenttest1)
    // }
    
 



      return (
    
        <div className='h-full w-full text-black bg-white place-items-center p-2 grid  '>
{   selectedTest&&  studenttest1&&    <h1></h1>
}      
    
     
     <div className="h-screen w-full shadow-2xl">
     {/* <button  className='btn btn-warning w-full' onClick={callAutoGrade}>AutoGrade</button> */}

     <form classNamew="h-fit w-full" onSubmit={handleSubmit} >
     <div className="  overflow-auto  grid place-items-start rounded bg-white p-4   w-full h-full">
    <div className="w-full h-full grid gap-24 ">
    { autoGraded &&
    (
      <div>


{autoGraded &&

<TeacherPagnate   handleInputChange={handleInputChange} itemsPerPage={1}  handleRestraintChange={handleRestraintChange}  />
}
{/* {autoGraded &&autoGraded?.[0].submission?.map((w)=>{
          return(
            
           <h1>{w.tes_t?.questions.map((value,index)=>{
             return(

              <div key={value.question_id} className='border-2 w-full h-96   p-4  grid ' > 
              
              <div class=" grid grid-cols-4 place-items-center ">
             
              <div className='grid place-items-center' >

<h1 className="text-sm" >  Category:</h1>
<h1>{value.question.category}</h1>


</div> 
<h1>{value.question.question}</h1>
<div className='grid place-items-center grid-cols-1'  >

         <h1 className="text-sm" >  Difficulty:</h1>
         <h1> {value.question.difficulty}</h1>


         </div>


        <div className='grid gri-cols-1 place-items-center' >
        <label>Auto Graded Points:  </label>
         <input  onChange={e=>{handleInputChange(e,index) }}  type='number'   placeholder='points'  defaultValue={value?.question.grade.grade} name='grade'   className= "border-2 border-gray-200" ></input>
         <label>Function Name?:  </label>
         <input    onChange={e=>{handleInputChange(e,index) }}   defaultValue={value?.question.grade.name_correct?'true':'false'} name='name_correct'   className= "border-2 border-gray-200" ></input>



        </div>
        
        
              </div>
       
         


         <div className="row-span-4 text-center border-2 overflow-auto grid ">
         <h1> Student Answer: {value.answer}</h1>
         <div>
         {value.question.grade.test_cases.map((val)=>{

return(
     <div className='grid grid-cols-3 overflow-auto'>
          <h1> Case  {val.case.map((x,i)=>{
            if(i===0){
              return "["+x +', '
            }
            else{
              return x +"]"
            }
            
            })}  </h1>
       <h1>Correct Output: { typeof val.correct_output == 'boolean'? val.correct_output.toString():val.correct_output}</h1>
       <h1> Student Output: {val.output}</h1>

     </div>

         )})}
         </div>

<textarea   placeholder='Enter Comment' name='comment' onChange={(e)=>handleInputChange(e,index)} className= "p-5 bg-gray-200 w-full h-3/5 place-self-end rounded-md" ></textarea>

</div>
     </div>
             )
           })}</h1>
            
            )})
          } */}

   
    






















        </div>
    )
    
    
    
    
    
    }
    
    
    
    </div>
     
           
           </div>
           <div className="grid p-4 bg-white h-full w-full place-items-center ">
    <div class="grid gap-4 row w-full place-items-center ">
    <button  className="btn btn-success"  type="submit">Submit</button>
    </div>
   

    
    
       </div>
           </form>


    </div>
    
    
    
    
    
    
       
    
    
    
    
    
    
    
    
    <button  className='btn  w-48 mt-4  shadow-lg   flex justify-self-start  btn-info'><Link onClick={togglePopup} to="/teacher" >Back to Dashboard</Link></button>

    </div>
      )
    }
    

export default GradeTest