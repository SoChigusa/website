import { Pagination } from "react-bootstrap";

export const PAGE_SIZE = '6';

export const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

const PaginationBar = ({ pages, current_page = 1 }) => {
  const firstPage = pages[0];
  const previousPage = Math.max(firstPage, current_page - 1);
  const lastPage = pages.slice(-1)[0];
  const nextPage = Math.min(lastPage, parseInt(current_page) + 1);
  return (
    <Pagination className="justify-content-center">
      <Pagination.First href={`/tips/page/${firstPage}`} />
      <Pagination.Prev href={`/tips/page/${previousPage}`} />
      {pages.map((page) => (
        <Pagination.Item key={page} active={current_page.toString() === page.toString()} href={`/tips/page/${page}`}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next href={`/tips/page/${nextPage}`} />
      <Pagination.Last href={`/tips/page/${lastPage}`} />
    </Pagination>
  );
};

export default PaginationBar;