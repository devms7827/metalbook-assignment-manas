// This file contains all the code for friends list preview card!

import React from "react";
import "../App.css";
import deleteIcon from "../assets/delete.svg";
import starFilled from "../assets/star-filled.svg";
import starUnfilled from "../assets/star-unfilled.svg";

const FriendsDataPreview = (props) => {
  const { data, handleFavorite, handleDelete } = props;

  const onDelete = () => {
    const message =
      "Are you sure you want to remove this friend from friend's list?";

    if (window.confirm(message)) handleDelete(data?._id);
  };

  return (
    <div className="preview-card">
      <div className="preview-card_title">{data?.name}</div>

      <div className="preview-card_subTitle">is your friend</div>

      <button
        className="preview-card_b1-fav"
        onClick={() => handleFavorite(data?._id, !data?.isFavorite)}
      >
        <img
          src={data?.isFavorite ? starFilled : starUnfilled}
          className="preview-card_b1-fav-img"
          alt="favorite-svg"
          title={`Mark as ${data?.isFavorite ? "unfavorite" : "favorite"}`}
        />
      </button>

      <button className="preview-card_b2-del" onClick={() => onDelete()}>
        <img
          src={deleteIcon}
          className="preview-card_b2-del-img"
          alt="delete-svg"
          title="Remove this friend"
        />
      </button>
    </div>
  );
};

export default FriendsDataPreview;
