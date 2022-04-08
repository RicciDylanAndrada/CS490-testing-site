import React from 'react'
import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StudentSubTable from './StudentSubTable';
import ReactPaginate from 'react-paginate';

function Pagnate({fetchSubmission,selectedTest,itemsPerPage}) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const items=fetchSubmission?.submissions?.filter((x)=>{
    return(
      x?.submission?.some((v)=>{
        return(  v.test_id == selectedTest)
      }))})

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items[0].submission[0].tes_t.questions.slice(itemOffset, endOffset));
    console.log(Math.ceil(items[0].submission[0].tes_t.questions.length));
    setPageCount(Math.ceil(items[0].submission[0].tes_t.questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  console.log(currentItems)


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items[0].submission[0].tes_t.questions.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  
  return (
    <div className='w-full h-full grid grid-rows-6 '>

<div class="row-span-5 w-full   ">
    {
       
      items.map((x)=>{
      return(
        x?.submission?.map((w)=>{
          var sum = 0
              w.tes_t.questions.map((x)=>{
              sum+=Number(x?.question?.grade?.grade )
              
            })
            
          return(
            
       <StudentSubTable sum={sum} w={currentItems}/>
       

            )
            }
            
            
            
            
            ))})
      
      
    }
</div>

      <div class="  grid place-items-center row-span-1">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination w-full!important"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>


      </div>
      





  )
}

export default Pagnate