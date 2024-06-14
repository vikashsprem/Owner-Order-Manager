import { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  
  const [inputPage, setInputPage] = useState(currentPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputPage(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(inputPage);
      if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      } else {
        setInputPage(currentPage.toString());
      }
    }
  };

  const handleInputBlur = () => {
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    } else {
      setInputPage(currentPage);
    }
  };

  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded`}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex items-center">
        <span className="mr-2">Page</span>
        <input
          type="number"
          className="block w-16 px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
        />
        <span className="ml-2">of {totalPages}</span>
      </div>
      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded`}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
