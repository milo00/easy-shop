import {
  Pagination as ReactsrapPagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import _ from "lodash";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChanges: (page: number) => void;
}

const Pagination = (props: IPaginationProps) => {
  const maxVisiblePages = 5;
  const startPage = Math.min(
    Math.max(1, props.currentPage - 2),
    Math.max(1, props.totalPages - 5)
  );
  const endPage = Math.min(
    props.currentPage + maxVisiblePages,
    props.totalPages + 1
  );

  return (
    <ReactsrapPagination className="w-auto">
      <PaginationItem disabled={props.currentPage === 1}>
        <PaginationLink first onClick={() => props.onPageChanges(1)} />
      </PaginationItem>
      <PaginationItem disabled={props.currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => props.onPageChanges(props.currentPage - 1)}
        />
      </PaginationItem>
      {_.range(startPage, endPage).map((index: number) => (
        <PaginationItem key={index} active={index === props.currentPage}>
          <PaginationLink onClick={() => props.onPageChanges(index)}>
            {index}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={props.currentPage === props.totalPages}>
        <PaginationLink
          next
          onClick={() => props.onPageChanges(props.currentPage + 1)}
        />
      </PaginationItem>
      <PaginationItem disabled={props.currentPage === props.totalPages}>
        <PaginationLink
          last
          onClick={() => props.onPageChanges(props.totalPages)}
        />
      </PaginationItem>
    </ReactsrapPagination>
  );
};

export default Pagination;
