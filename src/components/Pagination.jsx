import React from "react";
import style from "./Pagination.module.scss";

export function PaginationDemo({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={style.paginationContainer}>
      {/* Previous button */}
      <button
        onClick={onPrev}
        className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ""}`}
      >
        <img src="/images/icon-caret-left.svg" alt="" /> Prev
      </button>

      {/* Page numbers */}
      <div className={style.pageNumbers}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${style.pageButton} ${
              page === currentPage ? style.active : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className={`${style.pageButton} ${currentPage === totalPages ? style.disabled : ""}`}
      >Next
        <img src="/images/icon-caret-right.svg" alt="" /> 
      </button>
    </div>
  );
}
