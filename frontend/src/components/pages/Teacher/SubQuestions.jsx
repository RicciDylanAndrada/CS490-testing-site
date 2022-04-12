import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TestQuestionBox from './TestQuestionBox';
function SubQuestions({w,sum,handleInputChange,handleRestraintChange,itemOffset}) {
  return   (
   
    <div className="w-full h-full grid grid-cols-2 gap-2 ">
    <TestQuestionBox val={w} />





            <TableContainer   component={Paper}>
      <Table className="border-2" size="medium" aria-label="simple table">
      
          {w?.map((value,index)=>{
            let show_sum =0;
            let sum=0;
            let show_test=0
            value.question.grade.test_cases.map((v)=>{
              show_test+= Number(v.show_points)
            })
            show_sum=Number(Number(value.question.grade.show_name_correct) + Number(value.question.grade.show_restraint)) + show_test






            let test=0;
            value.question.grade.test_cases.map((x)=>{
              test+= Number(x.points)
            })
            
            sum=Number(Number(value.question.grade.restraint) + Number(value.question.grade.name_correct)) + test
            


             return(
          <>
          <TableHead>

         
        </TableHead>
        <TableBody>
       
         
          <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}colSpan={20} align="center"> </TableCell>

<TableCell  sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Expected</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Response</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">AutoGrader</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Manual</TableCell>

          </TableRow>

<TableRow>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">Correct Function Name</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{value.question.function_name}()</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"></TableCell>

<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{typeof value.question.grade.show_name_correct== 'boolean' ?value.question.grade.show_name_correct.toString() : value.question.grade.show_name_correct}</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"> <input onBlur={(e) => e.target.value = ''}    onFocus={(e) => e.target.value = value.question.grade.name_correct } onChange={e=>{handleRestraintChange(e,itemOffset) }}  type='number'       value={value.question.grade.name_correct} name='name_correct'   className= "border-2 border-gray-200" ></input>
</TableCell>


</TableRow>
<TableRow>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"> Restraint</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{value.question.restraint}</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"></TableCell>

<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{typeof value.question.grade.show_restraint== 'boolean' ?value.question.grade.show_restraint.toString() : value.question.grade.show_restraint}</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"> <input onBlur={(e) => e.target.value = ''}   onFocus={(e) => e.target.value = value.question.grade.restraint }   onChange={e=>{handleRestraintChange(e,itemOffset) }}  type='number'    value={ value.question.grade.restraint}  name='restraint'   className= "border-2 border-gray-200" ></input>
</TableCell>


</TableRow>

          {value.question.grade.test_cases.map((val,idex)=>{

return(
  <TableRow >



  <TableCell sx={{ fontWeight: 'light' }} colSpan={20}  align="center">
{value.question.function_name}(     {val.case.map((x,i)=>{
              if(i===0){
              return " "+x +', '
            }
            else{
              return x +" "
            }
                 
            
            
            })} ) 
            </TableCell>
            <TableCell sx={{ fontWeight: 'light' }} colSpan={20}  align="center">{typeof val.correct_output == 'boolean'? val.correct_output.toString():val.correct_output}</TableCell>
                  <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{val.output}</TableCell>
                  <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{val.show_points}</TableCell>
                  <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center"> <input onBlur={(e) => e.target.value = ''}    onFocus={(e) => e.target.value = val.points }  onChange={e=>{handleInputChange(e,itemOffset, idex) }}  type='number'   placeholder='points'  value={val.points} name='points'   className= "border-2 border-gray-200" ></input>
</TableCell>


     </TableRow>

         )})}
         <TableRow>
         <TableCell sx={{ fontWeight: 'bold' }} colSpan={60} align="center">Total</TableCell>


<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">{show_sum}</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center"> 
{sum}

</TableCell>
          </TableRow>
          <TableRow>
         <TableCell sx={{ fontWeight: 'light' }} colSpan={100} align="center">

         <textarea onBlur={(e) => e.target.value = ''}    onFocus={(e) => e.target.value = value?.question?.grade.comment?   value?.question?.grade.comment:""}   placeholder='Enter Comment' name='comment' onChange={(e)=>handleRestraintChange(e,itemOffset)} className= "p-5 bg-gray-200 w-full h-3/5 place-self-end rounded-md" ></textarea>

         </TableCell>

          </TableRow>
            
        
        </TableBody>
          
       
         
     </>
             )
           })}
           </Table>
    </TableContainer>
            
           </div> 
  )
}

export default SubQuestions