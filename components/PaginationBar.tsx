import { Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "./Link";

export const PAGE_SIZE: number = 24;

export const range = (start: number, end: number, length: number = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

const PaginationBar = ({ totalPages, current_page = 1 }: { totalPages: number, current_page?: number }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        defaultPage={current_page}
        showFirstButton
        showLastButton
        color="primary"
        renderItem={(item) => (
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