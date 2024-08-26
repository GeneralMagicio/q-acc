import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IPagination {
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  currentPage: number;
  itemPerPage: number;
}
interface IPaginationItemProps {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
}

const PaginationItem: React.FC<IPaginationItemProps> = ({
  children,
  onClick,
  isDisabled = false,
  isActive = false,
}) => {
  const baseStyle = "text-black";
  const disabledStyle = "text-black";
  const activeStyle = isActive ? "font-bold" : "";
  const cursorStyle = isDisabled ? "cursor-not-allowed " : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-black ${cursorStyle} ${activeStyle} ${
        isDisabled ? disabledStyle : ""
      }`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

const Pagination = (props: IPagination) => {
  const { setPage, currentPage, totalCount, itemPerPage } = props;
  const [pages, setPages] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const nop = Math.ceil(totalCount / itemPerPage);
    const _pages: Array<string | number> = [];
    const current_page = currentPage + 1;
    // Loop through
    for (let i = 1; i <= nop; i++) {
      // Define offset
      const offset = i == 1 || nop ? itemPerPage + 1 : itemPerPage;
      // If added
      if (
        i == 1 ||
        (current_page - offset <= i && current_page + offset >= i) ||
        i == current_page ||
        i == nop
      ) {
        _pages.push(i);
      } else if (
        i == current_page - (offset + 1) ||
        i == current_page + (offset + 1)
      ) {
        _pages.push("...");
      }
    }
    setPages(_pages);
    setPageCount(nop);
  }, [totalCount, currentPage, itemPerPage]);

  if (pageCount < 2) return null;
  return (
    <div className="flex mt-4 gap-4 items-center">
      <PaginationItem
        onClick={() => {
          if (currentPage > 0) setPage((page) => page - 1);
        }}
        isDisabled={currentPage === 0}
      >
        Prev
      </PaginationItem>
      {pages.map((p, id) => (
        <PaginationItem
          key={id}
          onClick={() => {
            if (!isNaN(+p)) setPage(+p - 1);
          }}
          isActive={+p - 1 === currentPage}
        >
          {p}
        </PaginationItem>
      ))}

      <PaginationItem
        onClick={() => {
          if (currentPage + 1 < pageCount) setPage((page) => page + 1);
        }}
        isDisabled={currentPage + 1 >= pageCount}
      >
        Next
      </PaginationItem>
    </div>
  );
};

export default Pagination;
