import { useEffect, useState } from 'react';

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
      <button onClick={() => setPage(curPage - 1)} disabled={curPage === 1}>
        &lt;
      </button>
      {rendering()}
      <button onClick={() => setPage(curPage + 1)} disabled={curPage === totalPage}>
        &gt;
      </button>
    </>
  );
}

export default CustomPagination;
