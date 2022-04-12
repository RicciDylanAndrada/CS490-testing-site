import React from 'react'
import ReactPaginate from 'react-paginate';
import { useState,useEffect,useContext } from 'react';
import TeacherContext from '../../../content/TeacherContext'

import SubQuestions from './SubQuestions';
function TeacherPagnate({handleInputChange,itemsPerPage,handleRestraintChange}) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  
      const {autoGraded}=useContext(TeacherContext)

    console.log(autoGraded)

    useEffect(() => {
        // Fetch autoGraded?. from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(autoGraded?.[0]?.submission?.[0]?.tes_t?.questions.slice(itemOffset, endOffset));
       
        setPageCount(Math.ceil(autoGraded?.[0]?.submission?.[0]?.tes_t?.questions.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);


      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % autoGraded?.[0]?.submission?.[0]?.tes_t?.questions.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
  return (
    <div>


<div class="row-span-5 w-full   ">
    {
       
      autoGraded?.map((x)=>{
      return(
        x?.submission?.map((w,i)=>{
          
            
          return(
            
       <SubQuestions key={i} itemOffset={itemOffset} w={currentItems} handleInputChange={handleInputChange} handleRestraintChange={handleRestraintChange}/>
       

            )
            }
            
            
            
            
            ))})
      
      
    }
</div>
    {/* items.map((x)=>{
    return(

            <div class="w-full h-full">
            <TestQuestions val={currentItems} handleInputChange={handleInputChange} studentSub={studentSub} keyHandler={keyHandler}/>

            </div>
            
            
        
    
    )
   
}) */}

<div class="w-full grid place-items-center">
<ReactPaginate
        nextLabel="Next Question >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Previous Question"
        pageClassName="page-item  text-secondary "
        pageLinkClassName="page-link   text-secondary"
        previousClassName="page-item  text-secondary"
        previousLinkClassName="page-link   text-secondary"
        nextClassName="page-item text-secondary"
        nextLinkClassName="page-link text-secondary"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination "
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  )
}

export default TeacherPagnate