// This file contains all the code for handling pagination

import React from "react";
import "../App.css";
import { getTotalPageButtons } from "../utils";

const Pagination = (props) => {
  const { currentPage, pageSize, total, onPageChange, onPageSizeChange } =
    props;

  let totalButtons = getTotalPageButtons(total, pageSize);

  return (
    <div className="pagination-wrapper">
      {Array.from({ length: totalButtons }, (x, i) => {
        let buttonValue = i + 1;

        return (
          <button
            type="button"
            title={`Page ${buttonValue}`}
            className="page-button"
            value={buttonValue}
            onClick={(e) => onPageChange(e.target.value)}
          >
            {buttonValue}
          </button>
        );
      })}

      <select
        name="pageSize"
        id="pageSize"
        title="Change page size"
        className="page-size-changer"
        onChange={(e) => onPageSizeChange(e.target.value)}
      >
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>

      <span>
        Page {currentPage} of {totalButtons}, Total Friends {total}
      </span>
    </div>
  );
};

export default Pagination;
