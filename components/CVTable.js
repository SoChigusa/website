import styled from "@emotion/styled";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f6f6f6',
  },
}));

const TitleBlock = ({ title }) => {
  if (title != '') {
    return (
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
    );
  } else {
    return (
      <Typography gutterBottom variant="h5" sx={{ display: { xs: 'none', md: 'flex' } }}>　</Typography>
    );
  }
};

const CVTable = ({ title = '', rows }) => {
  return (
    <Grid item xs={12} md={6}>
      <TitleBlock title={title} />
      <TableContainer component={Paper} >
        <Table size="small" aria-label="personal data">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <TableCell align="left">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CVTable;