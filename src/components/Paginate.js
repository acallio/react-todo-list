import React from "react";

const Paginate = ({
  maxCountPerPage,
  tasks,
  setTasks,
  pageNumber,
  setPageNumber,
  darkMode,
  searchTask,
}) => {
  //if user is not searching for anything use normal paginate display
  if (searchTask === "") {
    return (
      //to display active first page when the second page is triggered
      <div className={darkMode ? "paginate-dark" : "paginate"}>
        <span
          className={
            tasks.length / maxCountPerPage <= 1
              ? "paginate-link display-none"
              : pageNumber === 1
              ? "paginate-link active"
              : "paginate-link"
          }
          onClick={() => {
            setPageNumber(1);
          }}
        >
          1
        </span>
        {/* to actually paginate the pages other than the first */}
        {tasks.length > maxCountPerPage
          ? tasks.map((task, index) => {
              return index % maxCountPerPage === 0 && index !== 0 ? (
                <span
                  className={
                    pageNumber === index / maxCountPerPage + 1
                      ? "paginate-link active"
                      : "paginate-link"
                  }
                  key={index}
                  onClick={() => {
                    setPageNumber(index / maxCountPerPage + 1);
                    const sortedTasks = [...tasks];
                    //sort by time since creation to get newer tasks first
                    sortedTasks.sort((a, b) => b.created - a.created);
                    //transform to number to sort non checked tasks first
                    sortedTasks.sort(
                      (a, b) => Number(a.isChecked) - Number(b.isChecked)
                    );
                    setTasks(sortedTasks);
                  }}
                >
                  {index / maxCountPerPage + 1}
                </span>
              ) : null;
            })
          : null}
      </div>
    );
  } else {
    return null;
  }
};

export default Paginate;
