import React, { useState } from 'react';

export const SortButton = ({children, asc, onClick, ...props}) => {
  const [sortState, setSortState] = useState(asc ? "asc" : "desc"); // 'asc' or 'desc'
  const handleClick=()=>{
    let newSortState = sortState == "asc" ? "desc" : "asc"; 
    setSortState(newSortState)    
    if(onClick) onClick(newSortState);
  }
  return (
    <>
      <button {...props} onClick={handleClick}>
        {children}
        <i className={`fa fa-sort-amount-${sortState} pl-2`} aria-hidden="true"></i>
      </button>
    </>
  );
}
export default SortButton