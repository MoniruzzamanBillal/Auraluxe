import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  // console.log(currentPage);
  // console.log(totalPages);
  // console.log(isLoading);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 3;
      } else if (currentPage >= totalPages - 1) {
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

      pages.push(totalPages);
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

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Arrow */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-3xl text-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <IoMdArrowDropleft />
      </button>

      {/* Page Buttons */}
      {/* Page Buttons */}
      {pageNumbers?.map((page, index) => (
        <button
          key={index}
          onClick={() =>
            typeof page === "number" && !isLoading && onPageChange(page)
          }
          disabled={isLoading || page === "..."}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-sm font-semibold ${
            page === "..."
              ? "cursor-default border border-[#E6E6E6] text-gray-400"
              : page === currentPage
                ? "bg-gray-800 text-white"
                : "border border-[#E6E6E6] text-gray-500 hover:bg-gray-100"
          } ${page === "..." || isLoading ? "cursor-not-allowed" : ""} `}
        >
          {page}
        </button>
      ))}

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-3xl text-charcoolGray hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <IoMdArrowDropright />
      </button>
    </div>
  );
}
