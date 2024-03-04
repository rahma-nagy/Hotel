import { Button, List, ListItemButton } from "@mui/material";
import React, { useState } from "react";
import { KeyboardEvent } from "react";
interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFetchRooms: (page: number) => void;
}
// ... (your imports and interface)

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onFetchRooms,
}) => {
  const visiblePageLimit = 5; // Number of visible pages
  const halfVisiblePageLimit = Math.floor(visiblePageLimit / 2);

  const startPage = Math.max(1, currentPage - halfVisiblePageLimit);
  const endPage = Math.min(totalPages, startPage + visiblePageLimit - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const [pageNumberInput, setPageNumberInput] = useState("");


const handlePageNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumberInput(e.target.value);
  };
  const handleGoToPage = () => {
    const pageNumber = parseInt(pageNumberInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setLoading(true);
      onPageChange(pageNumber);
      onFetchRooms(pageNumber);
    }
  };

  const handlePageNumberInputKeyPress = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };


  return (

    <nav aria-label="..." className="paginat-nav">
      <List className="pagination  pagination-sm">

        <ListItemButton
          className="pageLink btn-hover-custom"
          onClick={() => {
            onPageChange(currentPage - 1);
            onFetchRooms(currentPage - 1);
          }}
          disabled={currentPage === 1} // Disable if on the first page
        >
          Prev
        </ListItemButton>

        {pages.map((page) => (
          <ListItemButton
            key={page}
            className={`page-item ${
              page === currentPage ? "active" : ""
            } pageLink btn-hover-custom `}

            onClick={() => {
                onPageChange(page);
                onFetchRooms(page);;
              }}
          >
            {page}
          </ListItemButton>

        ))}

        <ListItemButton
          className="pageLink btn-hover-custom"

          onClick={() => {
            onPageChange(currentPage + 1);
            onFetchRooms(currentPage + 1);
          }}
          disabled={currentPage === totalPages} // Disable if on the last page
        >

          Next
        </ListItemButton>
      </List>

      <p className="textCenter">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
};

export default CustomPagination;