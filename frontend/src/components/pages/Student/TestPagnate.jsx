import React from 'react'
import { useState,useEffect } from 'react';
import TestQuestions from './TestQuestions';
import ReactPaginate from 'react-paginate';

function TestPagnate({selectedTest,fetchTest,handleInputChange,keyHandler,studentSub,itemsPerPage}) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  
    const items=fetchTest?.test?.filter((x)=>{
        return(  x?.test_id == selectedTest)
    
    })
console.log(items)
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items[0].tes_t.questions.slice(itemOffset, endOffset));
      console.log(Math.ceil(items[0].tes_t.questions.length));
      setPageCount(Math.ceil(items[0].tes_t.questions.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    console.log(currentItems)
  
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items[0].tes_t.questions.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    console.log(pageCount)
    
    return (
      <div className='w-full h-full grid '>
  
  { 
items.map((x)=>{
    return(

            <div class="w-full h-full">
            <TestQuestions val={currentItems} handleInputChange={handleInputChange} studentSub={studentSub} keyHandler={keyHandler}/>

            </div>
            
            
        
    
    )
   
})
        
        }
        <div class="w-full grid place-items-center">
        <ReactPaginate
          nextLabel="Next Question >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous Question"
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
        
  
  
  
  
  
    )}

export default TestPagnate   
             {/* <TestQuestions  key={val} val={x} handleInputChange={handleInputChange} keyHandler={keyHandler} studentSub={studentSub.answers} /> */}
