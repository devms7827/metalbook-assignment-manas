// This file contains code to show an empty list component

import React from "react";
import "../App.css";
import emptyIcon from "../assets/empty.svg";

const EmptyList = () => {
  return (
    <div className="records-empty">
      <div>
        <img
          src={emptyIcon}
          className="records-empty_img"
          alt="empty-svg"
          title="No data found!"
        />
      </div>

      <div>No friends are added yet!</div>
    </div>
  );
};

export default EmptyList;
