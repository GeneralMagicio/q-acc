import { neutralColors, Caption, FlexCenter } from "@giveth/ui-design-system";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useIntl } from "react-intl";
export enum ETheme {
  NOT_INITIATED = 0,
  Light = 1,
  Dark = 2,
}
interface IPagination {
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  currentPage: number;
  itemPerPage: number;
}

const Pagination = (props: IPagination) => {
  const { setPage, currentPage, totalCount, itemPerPage } = props;
  const [pages, setPages] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const { formatMessage } = useIntl();
  const theme = ETheme.Light;

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
    <PaginationRow>
      <PaginationItem
        $baseTheme={theme}
        onClick={() => {
          if (currentPage > 0) setPage((page) => page - 1);
        }}
        $disable={currentPage == 0}
      >
        {`<  ${formatMessage({ id: "label.prev" })}`}
      </PaginationItem>
      {pages.map((p, id) => {
        return (
          <PaginationItem
            key={id}
            $baseTheme={theme}
            onClick={() => {
              if (!isNaN(+p)) setPage(+p - 1);
            }}
            $isActive={+p - 1 === currentPage}
          >
            {p}
          </PaginationItem>
        );
      })}
      <PaginationItem
        $baseTheme={theme}
        onClick={() => {
          if (currentPage + 1 < pageCount) setPage((page) => page + 1);
        }}
        $disable={currentPage + 1 >= pageCount}
      >
        {`${formatMessage({ id: "label.next" })}  >`}
      </PaginationItem>
    </PaginationRow>
  );
};

const PaginationRow = styled(FlexCenter)`
  margin-top: 16px;
  gap: 16px;
`;

interface IPaginationItem {
  $disable?: boolean;
  $isActive?: boolean;
  $baseTheme: ETheme;
}

const PaginationItem = styled(Caption)<IPaginationItem>`
  ${(props) =>
    props.$disable
      ? css`
          color: ${props.$baseTheme === ETheme.Dark
            ? neutralColors.gray[700]
            : neutralColors.gray[500]};
        `
      : css`
          cursor: pointer;
          color: ${props.$baseTheme === ETheme.Dark
            ? neutralColors.gray[100]
            : neutralColors.gray[900]};
        `};
  ${(props) => props.$isActive && `font-weight: bold;`};
`;

export default Pagination;
