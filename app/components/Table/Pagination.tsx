"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pages = Array.from(Array(totalPages).keys()).map((i) => i + 1);
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.push(`/home?page=${page}&pageSize=6`);
  };

  return (
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-md h-8">
      <li>
        <button
          className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-s-lg hover:bg-gray-700 hover:text-white ${
            page === 1 &&
            "opacity-50 cursor-default pointer-events-none hover:bg-gray-800"
          }`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
      </li>
      {pages.map((p) => {
        return (
          <li key={p}>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white ${
                page === p
                  ? "bg-green-600 text-gray-900 hover:bg-green-600 hover:text-inherit cursor-auto"
                  : ""
              }`}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-e-lg hover:bg-gray-700 hover:text-white ${
            page === totalPages &&
            "opacity-50 cursor-default pointer-events-none hover:bg-gray-800"
          }`}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
