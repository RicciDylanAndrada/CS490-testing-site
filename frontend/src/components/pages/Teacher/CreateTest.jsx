// import React from 'react'
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';

// function CreateTest({fetchTest,left,right,checked,setChecked,setRight,setLeft,handleSubmit,setTest}) {
//     const not =(a, b)=> {
//         return a?.filter((value) => b.indexOf(value) === -1);
//       }
      
//       const intersection = (a, b)=> {
//         return a?.filter((value) => b.indexOf(value) !== -1);
//       }
//       const leftChecked = intersection(checked, left);
//       const rightChecked = intersection(checked, right);
      
      
//       const handleToggle = (value) => () => {
//         const currentIndex = checked.indexOf(value);
//         const newChecked = [...checked];
      
//         if (currentIndex === -1) {
//           newChecked.push(value);
//         } else {
//           newChecked.splice(currentIndex, 1);
//         }
      
//         setChecked(newChecked);
//       };
      
      
      
//       const handleAllRight = () => {
//         setRight(right.concat(left));
//         setLeft([]);
//       };
      
      
      
//       const handleCheckedLeft = () => {
//         setLeft(left.concat(rightChecked));
//         setRight(not(right, rightChecked));
//         setChecked(not(checked, rightChecked));
//         console.log(left)
      
//       };
//       const handleCheckedRight = () => {
//         setRight(right.concat(leftChecked));
//         setLeft(not(left, leftChecked));
//         setChecked(not(checked, leftChecked));
//       };
      
      
//       const handleAllLeft = () => {
//         setLeft(left.concat(right));
//         setRight([]);
//         console.log(left)
//       };
      
//       const customList = (items) => (
      
//         <div className="overflow-auto h-full w-full   flex flex-col space-y-4    ">
        
          
//             {items?.map((value) => {
//               const labelId = `transfer-list-item-${value.question_id}-label`;
      
//               return (
//                 <div className='border-2 rounded-lg'>
      
               
//                 <ListItem
//                   key={value.question_id}
//                   role="listitem"
//                   className="border-2"
//                   button
//                   onClick={handleToggle(value)}
//                   sx={{ fontSize: "5px" }}
      
//                 >
//                   <ListItemIcon>
//                     <Checkbox
//                       checked={checked.indexOf(value) !== -1}
                      
//                       tabIndex={-1}
//                       disableRipple
//                       inputProps={{
//                         'aria-labelledby': labelId,
//                       }}
//                     />
//                   </ListItemIcon>
      
                  
//             <div className=' grid grid-rows-3 rounded-xl h-24 ' > 
                  
      
//                   <ListItemText 
      
//                    id={labelId} secondary={value?.question?.category} />
//                   <ListItemText
//        id={labelId} primary={value?.question?.question} />
//                   <ListItemText id={labelId} secondary={value?.question?.difficulty} />
      
//                   </div>
//                 </ListItem>
//                 </div>
//               );
//             })}
//             <ListItem />
            
//         </div>
//       );
//   return (
//     <div class="     bg-white shadow-xl grid grid-rows-6 1 text-center ">

         
//         <div class="border-b-2 w-full grid  border-b-gray row-span-1  y p-2 ">
//           <h1 class="justify-self-center place-self-center  text-lg " > New Test</h1>
//           <CreateTest/>
         
        
//         </div> 
//         <div class=" w-full  row-span-5 text-center    ">

//         <div class="grid grid-cols-2"></div>
//         {fetchTest && right && ( 
//         <form onSubmit={handleSubmit}>
//         <div class="grid grid-cols-2">
//         <TextField
//           id="outlined-password-input"
//           label="Test Name"
//           name='test_name'
//           className='w-full'
//           type="question text-center "
//           value={test.test_name}
//           onChange={e => setTest({...test,test_name:e.target.value})}
//           autoComplete="current-password"
//           required
//         />
//         <TextField
//           id="outlined-password-input"
//           label="Section"
//           name='section'
//           className='w-full'
//           type="question text-center "
//           value={test.section}
//           onChange={e => setTest({...test,section:e.target.value})}
//           autoComplete="current-password"
//           required
//         />
//         </div>
       

//         <div class="grid w-full  grid-cols-1   border-b-2 border-t-2 h-full ">
        
//     <div class="grid grid-cols-3 border-l-2  border-gray-200">

//     <div class="grid place-items-center w-full border-r-2 ">
//     <h1>Question Bank </h1>


//     <div class=" place-items-center h-full w-full p-4 overflow-auto       ">
//       <Grid
        
//       item>{customList(right)}</Grid>
//       </div>


//     </div>
   
//       <div class="  place-items-center grid ">
//       <Grid item>
//       <Grid container direction="column" alignItems="center">
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleAllRight}
//             disabled={left.length === 0}
//             aria-label="move all right"
//           >
//             ≪ All 
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleCheckedRight}
//             disabled={leftChecked.length === 0}
//             aria-label="move selected right"
//           >
//             Selected &lt;
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleCheckedLeft}
//             disabled={rightChecked.length === 0}
//             aria-label="move selected left"
//           >
//             Selected &gt;
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleAllLeft}
//             disabled={right.length === 0}
//             aria-label="move all left"
//           >
//             All ≫
//           </Button>
//         </Grid>
//       </Grid>
//      </div>
//      <div class="grid place-items-center border-l-2">
//     <h1> Test Questions </h1>


//     <div class=" place-items-center h-full  w-full p-4   overflow-auto ">
// <div className='h-full flex flex-col  space-y-4' >
// {customList(left)}

// </div>

    
//       </div>


//     </div>


// </div>        </div>
//         <div class=" w-full  grid  place-items-center    p-5 ">
//           <button type='"submit'  class="place-self-center  w btn btn-active   " >Add Points </button>
//         </div> 
//         </form>
//         )}
        
//         </div> 
//         </div>
//   )
// }

// export default CreateTest