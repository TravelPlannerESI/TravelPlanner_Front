import { useEffect, useState } from 'react';
import styles from './index.less';
function CustomPagination({ currentPage, pageCount, setPage, totalPage }) {
  // 화면에 보여질 페이지 수 pageCount
  // setPage => state
  // currentPage => 현재 페이지

  let curPage = currentPage;
  if (curPage > totalPage) curPage = totalPage;

  const startPage = Math.floor((curPage - 1) / pageCount) * pageCount + 1;
  let endPage = startPage + pageCount - 1;

  if (endPage > totalPage) endPage = totalPage;

  console.log(endPage, totalPage);

  const rendering = () => {
    const result = [];
    for (let i = startPage; i <= endPage; i++) {
      if (i == curPage)
        result.push(
          <button className={styles.active} key={i} onClick={() => setPage(i)}>
            {i}
          </button>,
        );
      else
        result.push(
          <button key={i} onClick={() => setPage(i)}>
            {i}
          </button>,
        );
    }
    return result;
  };
  return (
    <>
      <div className={styles.page_wrap}>
        <div className={styles.page_nation}>
          {curPage !== 1 && (
            <button className={styles.arrowprev} onClick={() => setPage(curPage - 1)}>
              &lt;
            </button>
          )}
          {rendering()}
          {curPage !== totalPage && (
            <button className={styles.arrownext} onClick={() => setPage(curPage + 1)}>
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomPagination;
