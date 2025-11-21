import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Arrow */}
      <button className="flex h-8 w-8 items-center justify-center rounded text-3xl text-gray-400 hover:bg-gray-100">
        <IoMdArrowDropleft />
      </button>

      {/* Page Buttons */}
      <button className="h-8 w-8 rounded bg-gray-800 text-sm font-semibold text-white">
        1
      </button>
      <button className="h-8 w-8 rounded border border-[#E6E6E6] text-sm text-gray-500 hover:bg-gray-100">
        2
      </button>
      <button className="h-8 w-8 rounded border border-[#E6E6E6] text-sm text-gray-500 hover:bg-gray-100">
        3
      </button>
      <div className="flex h-8 w-8 items-center justify-center border border-[#E6E6E6] text-gray-400">
        ...
      </div>

      {/* Next Arrow */}
      <button className="flex h-8 w-8 items-center justify-center rounded text-3xl text-[#363739] hover:bg-gray-100">
        <IoMdArrowDropright />
      </button>
    </div>
  );
}
