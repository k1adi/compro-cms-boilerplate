import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import PaginationButton from './PaginationButton';

export default function Pagination({ firstIndex, lastIndex, total, currentPage, lastPage, onPageChange, className = '' }) {
  const [inputPage, setInputPage] = useState(currentPage);
  
  // Update input when currentPage prop changes (e.g. from external controls)
  useEffect(() => {
    setInputPage(+currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      const pageNum = validatePageNumber(inputPage, +lastPage);
      setInputPage(pageNum);
      onPageChange(pageNum);
    }
  };

  const validatePageNumber = (value, max) => {
    const page = parseInt(value, 10);
    if (isNaN(page) || page < 1) return 1;
    if (page > max) return max;
    return page;
  };

  // No need to render pagination if there's only one page
  if (+lastPage <= 1) {
    return (
      <div className={'flex items-center justify-between pt-6 pb-4 ' + className}>
        <span>Showing <b>{firstIndex} - {lastIndex}</b> of <b>{total}</b> Entries</span>
      </div>
    );
  }

  return (
    <div className={'flex flex-col sm:flex-row items-center justify-between pt-6 pb-4 ' + className}>
      <span className='order-2 sm:order-1'>Showing <b>{firstIndex} - {lastIndex}</b> of <b>{total}</b> Entries</span>
      
      <nav className='order-1 sm:order-2 flex flex-row items-center'>
        {/* First Page Button */}
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={+currentPage === 1}
          desktopText="First"
          mobileIcon={<ChevronsLeft size={16}/>}
          className="ms-2"
        />
        
        {/* Previous Button */}
        <PaginationButton
          onClick={() => onPageChange(+currentPage - 1)}
          disabled={+currentPage === 1}
          desktopText="Previous"
          mobileIcon={<ChevronLeft size={16}/>}
          className="ms-2"
        />
        
        {/* Current Page Editable */}
        <span className='p-2 flex items-center'>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onKeyDown={handlePageSubmit}
            onBlur={handlePageSubmit}
            className="w-10 px-1 h-8 border border-gray-300 rounded-lg text-center text-md"
          /> / {lastPage}
        </span>
        
        {/* Next Page */}
        <PaginationButton
          onClick={() => onPageChange(+currentPage + 1)}
          disabled={+currentPage === +lastPage}
          desktopText="Next"
          mobileIcon={<ChevronRight size={16}/>}
        />
        
        {/* Last Page */}
        <PaginationButton
          onClick={() => onPageChange(+lastPage)}
          disabled={+currentPage === +lastPage}
          desktopText="Last" 
          mobileIcon={<ChevronsRight size={16}/>}
          className="ms-2"
        />
      </nav>
    </div>
  );
}