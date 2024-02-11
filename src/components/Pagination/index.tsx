import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: any;
};
const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
