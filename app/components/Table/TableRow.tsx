import { Status } from "./Table";
import { MdDoneAll } from "react-icons/md";
import { MdClose } from "react-icons/md";
import ActionButton from "../ActionButton";
import DescriptionPopover from "../DescriptionPopover";

interface TableRowProps {
  id: number;
  title: string;
  description: string;
  status: Status;
  completed: boolean;
  setRefetchData: (value: boolean) => void;
}

const TableRow = ({
  title,
  description,
  status,
  completed,
  id,
  setRefetchData,
}: TableRowProps) => {
  const formattedTitle =
    title.length > 20 ? title.slice(0, 20).trim() + "..." : title;

  return (
    <tr className="bg-slate-800 border-b border-green-600 text-lg">
      <th
        scope="row"
        className="px-6 py-4  font-medium text-black whitespace-nowrap "
      >
        <div className="flex justify-center items-center">{formattedTitle}</div>
      </th>
      <td className="px-6 py-4 text-lime-500 z-0">
        <div className="flex justify-center items-center">
          <DescriptionPopover description={description} />
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <div className="flex justify-center items-center">
          {status.split("_").join(" ")}
        </div>
      </td>
      <td
        className={`px-6 py-4 text-2xl ${
          completed ? "text-green-500" : "text-red-400"
        }`}
      >
        <div className="flex justify-center items-center">
          {completed ? <MdDoneAll /> : <MdClose />}
        </div>
      </td>
      <td className="text-2xl text-green-600">
        <div className="flex justify-center">
          <div className=" cursor-pointer w-fit">
            <ActionButton
              id={id}
              status={status}
              setRefetchData={setRefetchData}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
