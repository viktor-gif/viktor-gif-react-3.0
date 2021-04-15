import React, { useState } from "react";
import s from "./paginator.module.css";

const Paginator = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pagesArr = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i);
  }
  let portionSize = 10;
  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [currentPortion, setCurrentPortion] = useState(1);
  let leftPageOfPortion = currentPortion * portionSize - (portionSize - 1);
  let rightPageOfPortion = currentPortion * portionSize;

  return (
    <div className={s.pages}>
      {currentPortion > 1 && (
        <button onClick={() => setCurrentPortion(currentPortion - 1)}>
          prev
        </button>
      )}

      {pagesArr
        .filter((p) => p >= leftPageOfPortion && p <= rightPageOfPortion)
        .map((p) => {
          return (
            <span
              onClick={() => props.setCurrentPage(p)}
              className={props.selectedPage === p ? s.selectedPage : ""}
              key={p}
            >
              {p}
            </span>
          );
        })}

      {currentPortion < portionsCount && (
        <button onClick={() => setCurrentPortion(currentPortion + 1)}>
          next
        </button>
      )}
    </div>
  );
};

export default Paginator;
