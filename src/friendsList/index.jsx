// This file contains all the code for friends list component!

import React, { useState } from "react";
import "../App.css";
import { generateRandomId, getFilteredPaginationList } from "../utils";
import FriendsDataPreview from "./preview";
import Pagination from "./pagination";
import EmptyList from "./emptyList";
import searchIcon from "../assets/search.svg";
import clearIcon from "../assets/clear.svg";

const FriendsList = () => {
  const [name, setName] = useState("");

  const [friendsList, setFriendsList] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);

  const defaultCurrentPage = 1; // default page is 1
  const defaultPageSize = 4; // default page size is 4

  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleFavorite = (id, isFavorite) => {
    let index = friendsList.findIndex((data) => data?._id == id);

    let friendToMoveOnTop = friendsList[index];
    friendToMoveOnTop.isFavorite = isFavorite;

    let newFriendsList = friendsList.filter((data) => data?._id !== id);
    newFriendsList.unshift(friendToMoveOnTop);

    setFriendsList(newFriendsList);
  };

  const handleDelete = (id) => {
    let newFriendsList = friendsList.filter((data) => data?._id !== id);

    setFriendsList(newFriendsList);
  };

  const onEnter = (event) => {
    if (event.key == "Enter") {
      let name = event?.target.value || "";

      // Validating for empty, undefined or null value for name
      if (name === "" || name === undefined || name === null) {
        window.alert("Sorry, friend's name can not be empty!");
        return;
      }

      // Validating for same name already enterer or not, if list has 1 or more elements
      if (friendsList.length > 0) {
        let matchFound = false;

        friendsList.map((data) => {
          if (
            data?.name?.toLowerCase()?.localeCompare(name.toLowerCase()) === 0
          ) {
            matchFound = true;
            return;
          }
        });

        if (matchFound) {
          window.alert("This friend already exists in your friends's list!");
          setName("");
          return;
        }
      }

      // Preparing friends data for list
      let friendData = {
        _id: generateRandomId(),
        name,
        isFavorite: false,
      };

      let newFriendsList = [friendData, ...friendsList];

      setFriendsList(newFriendsList);

      // Resetting search result
      setSearchResultList([]);

      // Resetting name after saving in list
      setName("");
    }
  };

  const onPageChange = (newCurrentPage) => {
    setCurrentPage(newCurrentPage);
  };

  const onPageSizeChange = (newPagesize) => {
    setCurrentPage(defaultCurrentPage); // Resetting current page to defaultCurrentPage
    setPageSize(newPagesize);
  };

  const handleReset = () => {
    setName("");
    setFriendsList([]);
    setSearchResultList([]);
    setCurrentPage(defaultCurrentPage);
    setPageSize(defaultPageSize);
  };

  const onSearch = () => {
    if (name === "" || name === undefined || name === null) {
      window.alert("Please enter a name to search!");
    } else {
      let searchResult = friendsList.filter(
        (data) =>
          data?.name?.toLowerCase()?.localeCompare(name.toLowerCase()) === 0
      );

      if (searchResult.length > 0) {
        setSearchResultList(searchResult);
      } else {
        window.alert(
          "No friend found with this name! Please try with another name."
        );
      }
    }
  };

  const onSearchClear = () => {
    setName("");
    setSearchResultList([]);
  };

  return (
    <div className="list-wrapper">
      <div className="list-header">
        <span>Friend's List</span>

        <button
          type="button"
          title="Reset Friend's List"
          className="list-header_reset-btn"
          onClick={(e) => handleReset()}
        >
          Reset
        </button>
      </div>

      <div className="list-content">
        <div className="list-content_tool">
          <input
            type="text"
            name="friendName"
            placeholder="Enter your friend's name"
            className="list-content_input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => onEnter(e)}
          />

          <button
            type="button"
            title="Search"
            className="list-content_search"
            onClick={(e) => onSearch()}
          >
            <img
              src={searchIcon}
              alt="search-svg"
              title="Search a friend"
              className="list-content_search-img"
            />
          </button>

          <button
            type="button"
            title="Reset Search"
            className="list-content_search-clr-btn"
            onClick={(e) => onSearchClear()}
          >
            <img
              src={clearIcon}
              alt="clear-svg"
              title="Clear search"
              className="list-content_search-img"
            />
          </button>
        </div>

        <div>
          {searchResultList.length > 0 &&
            searchResultList.map((data) => {
              return (
                <FriendsDataPreview
                  data={data}
                  handleFavorite={handleFavorite}
                  handleDelete={handleDelete}
                />
              );
            })}

          {/* If friends are there show cards, else show empty list message */}
          {searchResultList.length < 1 && friendsList.length > 0 && (
            <div>
              {getFilteredPaginationList(
                friendsList,
                currentPage,
                pageSize
              ).map((data) => {
                return (
                  <FriendsDataPreview
                    data={data}
                    handleFavorite={handleFavorite}
                    handleDelete={handleDelete}
                  />
                );
              })}

              {friendsList.length >= pageSize && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  total={friendsList.length}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
            </div>
          )}

          {friendsList.length < 1 && <EmptyList />}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
