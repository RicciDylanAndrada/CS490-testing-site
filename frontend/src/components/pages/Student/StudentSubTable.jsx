import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function StudentSubTable({w,sum}) {
  return (
   
    <div className="w-full h-full">
            <TableContainer   component={Paper}>
      <Table className="  " size="medium" aria-label="simple table">
      
          {w?.map((value,index)=>{
             return(
          <>
          <TableHead>
          
          <TableRow>
          <h1>TOTAL GRADE : {sum}</h1>

          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          <td  className=' border-b-2    '  colSpan={20} align="center" >{value?.question.question}</td>
          <td  className=' border-b-2    '  colSpan={20} align="center" >Category</td>

          <td  className=' border-b-2    '  colSpan={20} align="center" >Points</td>
          <td  className=' border-b-2    '  colSpan={20} align="center" >Points Given</td>



          </TableRow>
          <TableRow>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} col align="center" >{value?.answer}</TableCell>
<TableCell sx={{ fontWeight: 'light' }} align="center" >{value?.question.category}</TableCell>
<TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center" >{value?.points}</TableCell>
 <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center" >{value?.question.grade.grade}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}colSpan={20} align="center">Test Case Input</TableCell>

<TableCell  sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Test Case Output</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Expected Output</TableCell>
<TableCell sx={{ fontWeight: 'bold' }} colSpan={20} align="center">Student Output</TableCell>
          </TableRow>


          {value.question.grade.test_cases.map((val)=>{

return(
  <TableRow  >

     {val.case.map((x,i)=>{
         return(
            <>
                  <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{x}</TableCell>
                  

                  </>
         )
                 
            
            
            })} 
            <TableCell sx={{ fontWeight: 'light' }} colSpan={20}  align="center">{typeof val.correct_output == 'boolean'? val.correct_output.toString():val.correct_output}</TableCell>
                  <TableCell sx={{ fontWeight: 'light' }} colSpan={20} align="center">{val.output}</TableCell>
     </TableRow>

         )})}
         <TableRow>
         <TableCell sx={{ fontWeight: 'bold' }} colSpan={100} align="center"> Teacher Comment:</TableCell>

          </TableRow>
          <TableRow>
         <TableCell sx={{ fontWeight: 'light' }} colSpan={100} align="center">{value?.question?.grade.comment}:</TableCell>

          </TableRow>
            
        
        </TableBody>
          
       
         <div className="row-span-4 text-center border-2 overflow-auto grid ">
        



</div>
     </>
             )
           })}
           </Table>
    </TableContainer>
            
           </div> 
  )
}

export default StudentSubTable