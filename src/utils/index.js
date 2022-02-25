// This file contains all the utility functions used for this assignment

export function generateRandomId() {
  // Will generate a unique and random 8 digit string

  return Math.random().toString(36).substr(2, 8);
}

export function getTotalPageButtons(totalRecords, pageSize) {
  // Will generate the page buttons count to show for pagination

  return Math.ceil(totalRecords / pageSize);
}

export function getFilteredPaginationList(list, currentPage, pageSize) {
  // Will filter the friends list to be shown based on page selected

  const fromIndex = (currentPage - 1) * pageSize;
  const toIndex = currentPage * pageSize;

  return list?.slice(fromIndex, toIndex);
}
