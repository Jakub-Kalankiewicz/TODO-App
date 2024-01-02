"use client";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import PaginationText from "./PaginationText";
import Pagination from "./Pagination";

export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type Todo = {
  id: number;
  title: string;
  description: string;
  status: Status;
  completed: boolean;
};

interface TableProps {
  data: Todo[] | null;
  totalPages: number;
  elementsNumber: number;
  page: number;
  handleHeaderClick: (header: string) => void;
  setRefetchData: (value: boolean) => void;
}

const pageSize = 6;

const Table = ({
  data,
  page,
  totalPages,
  elementsNumber,
  handleHeaderClick,
  setRefetchData,
}: TableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full pb-5">
      <table className="w-full text-md text-left rtl:text-right text-gray-400 ">
        <TableHeader handleHeaderClick={handleHeaderClick} />
        <tbody>
          {data ? (
            data.length > 0 ? (
              data.map((todo) => (
                <TableRow
                  key={todo.id}
                  {...todo}
                  setRefetchData={setRefetchData}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="w-full p-3 text-lg">
                  No transactions
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={5} className="w-full p-3 text-lg">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-center md:justify-between pt-4 px-4 w-full "
        aria-label="Table navigation"
      >
        <PaginationText
          page={page}
          pageSize={pageSize}
          elementsNumber={elementsNumber}
          length={data ? data.length : 0}
        />
        <Pagination page={page} totalPages={totalPages} />
      </nav>
    </div>
  );
};

export default Table;
