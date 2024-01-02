import Table from "@/app/components/Table/Table";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const pageSize = 6;

const TodoTable = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalTodos, setTotalTodos] = useState<number>(0);
  const [todoData, setTodoData] = useState(null);
  const [refetchData, setRefetchData] = useState(false);
  const [sort, setSort] = useState({ keyToSort: "", order: "" });

  const handleHeaderClick = (header: string) => {
    const formatedHeader = header.toLowerCase();
    setSort((prev) => {
      if (prev.keyToSort === formatedHeader) {
        return {
          keyToSort: formatedHeader,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      } else {
        return { keyToSort: formatedHeader, order: "asc" };
      }
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let url = `/api/todos?page=${currentPage}&pageSize=${pageSize}`;
        if (sort.keyToSort) {
          url += `&sort=${sort.keyToSort}&order=${sort.order}`;
        }
        const res = await axios.get(url);
        setTodoData(res.data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    const fetchTodosCount = async () => {
      try {
        const res = await axios.get("/api/todos/count");
        setTotalTodos(res.data.count);
        setTotalPages(Math.ceil(res.data.count / pageSize));
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchTodosCount();
    fetchTodos();
    if (refetchData) {
      setRefetchData(false);
    }
  }, [currentPage, sort, refetchData]);

  return (
    <Table
      data={todoData}
      totalPages={totalPages}
      page={currentPage}
      elementsNumber={totalTodos}
      handleHeaderClick={handleHeaderClick}
      setRefetchData={setRefetchData}
    />
  );
};

export default TodoTable;
