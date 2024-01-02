interface PaginationTextProps {
  page: number;
  length: number;
  pageSize: number;
  elementsNumber: number;
}

const PaginationText = ({
  page,
  length,
  pageSize,
  elementsNumber,
}: PaginationTextProps) => {
  return (
    <span className="text-md font-normal text-gray-600  mb-4 md:mb-0 block w-full md:inline md:w-auto">
      Showing{" "}
      <span className="font-semibold text-lime-500">{`${
        (page - 1) * pageSize + 1
      }-${(page - 1) * pageSize + length}`}</span>{" "}
      of <span className="font-semibold text-lime-500 ">{elementsNumber}</span>
    </span>
  );
};

export default PaginationText;
