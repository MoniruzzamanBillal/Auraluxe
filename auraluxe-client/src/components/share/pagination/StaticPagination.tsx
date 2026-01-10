"use client";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const StaticPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="text-charcoolGray hover:text-mediumGray flex h-8 w-8 cursor-pointer items-center justify-center rounded text-3xl disabled:cursor-not-allowed"
        >
          <IoMdArrowDropleft />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" && !isLoading && onPageChange(page)
            }
            disabled={isLoading || page === "..."}
            className={`flex size-8 items-center justify-center rounded text-sm font-semibold transition-colors ${
              page === "..."
                ? "text-mediumGray border-softGray cursor-default border"
                : page === currentPage
                  ? "bg-charcoolGray text-white"
                  : "border-softGray text-mediumGray border hover:bg-gray-100"
            } ${page === "..." || isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {page}
          </button>
        ))}

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
          className="text-charcoolGray hover:text-mediumGray flex h-8 w-8 cursor-pointer items-center justify-center rounded text-2xl disabled:cursor-not-allowed disabled:opacity-50"
          title="Next Page"
        >
          <IoMdArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default StaticPagination;
