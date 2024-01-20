import { Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "./Link";

export const PAGE_SIZE = 24;

export const range = (start: number, end: number, length: number = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

const noNextPage = (total_page: number, page: number | null) => {
  if (page === null)
    return true;
  else if (page < 1 || page > total_page)
    return true;
  else
    return false;
};

const PaginationBar = ({ total_page, current_page = 1 }: { total_page: number, current_page?: number }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={total_page}
        defaultPage={current_page}
        showFirstButton
        showLastButton
        color="primary"
        renderItem={(item) => noNextPage(total_page, item.page) ? (
          <PaginationItem
            {...item}
          />
        ) : (
          <Link href={`/tips/page/${item.page}`}>
            <PaginationItem
              {...item}
            />
          </Link>
        )}
        sx={{ display: 'flex', justifyContent: "center", padding: 2 }}
      />
    </Stack>
  );
};

export default PaginationBar;