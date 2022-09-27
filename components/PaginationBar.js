import { Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "./Link";

export const PAGE_SIZE = '24';

export const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

const PaginationBar = ({ totalPages, current_page = 1 }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        defaultPage={parseInt(current_page)}
        showFirstButton
        showLastButton
        color="primary"
        renderItem={(item) => (
          <Link href={`/tips/page/${item.page}`}>
            <PaginationItem
              component='a'
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